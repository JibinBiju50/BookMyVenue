import mongoose from "mongoose";
import Venue from "../models/Venue.js";
import BookingInquiry from "../models/BookingInquiry.js";

/**
 * Escapes special regex characters from user input.
 * This prevents user search text from breaking regex queries.
 */
const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Checks whether eventDate follows YYYY-MM-DD format.
 */
const isValidDateString = (date) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

/**
 * Finds venue IDs that are already booked for a selected event date.
 */
const getBookedVenueIdsByDate = async (eventDate) => {
  if (!eventDate) return [];

  if (!isValidDateString(eventDate)) {
    const error = new Error("eventDate must be in YYYY-MM-DD format");
    error.statusCode = 400;
    throw error;
  }

  const bookedInquiries = await BookingInquiry.find({
    eventDate,
    status: "accepted",
  }).select("venue");

  return bookedInquiries.map((inquiry) => inquiry.venue);
};

/**
 * Builds the MongoDB filter object for venue listing.
 *
 * If no filters are provided, this still returns:
 * {
 *   status: "approved",
 *   isActive: true
 * }
 *
 * So GET /api/venues returns all approved active venues.
 */

const buildVenueFilter = async (query = {}) => {
  const {
    district,
    town,
    category,
    keyword,
    eventDate,
    minCapacity,
    maxPrice,
  } = query;

  const filter = {
    status: "approved",
    isActive: true,
  };

  if (district) {
    filter.district = {
      $regex: `^${escapeRegex(district)}$`,
      $options: "i",
    };
  }

  if (town) {
    filter.town = {
      $regex: escapeRegex(town),
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  if (minCapacity) {
    const capacityNumber = Number(minCapacity);

    if (Number.isNaN(capacityNumber)) {
      const error = new Error("minCapacity must be a number");
      error.statusCode = 400;
      throw error;
    }

    filter.capacity = {
      $gte: capacityNumber,
    };
  }

  if (maxPrice) {
    const priceNumber = Number(maxPrice);

    if (Number.isNaN(priceNumber)) {
      const error = new Error("maxPrice must be a number");
      error.statusCode = 400;
      throw error;
    }

    filter["pricing.basePrice"] = {
      $lte: priceNumber,
    };
  }

  if (keyword) {
    const safeKeyword = escapeRegex(keyword);

    filter.$or = [
      { name: { $regex: safeKeyword, $options: "i" } },
      { town: { $regex: safeKeyword, $options: "i" } },
      { district: { $regex: safeKeyword, $options: "i" } },
      { address: { $regex: safeKeyword, $options: "i" } },
    ];
  }

  if (eventDate) {
    const bookedVenueIds = await getBookedVenueIdsByDate(eventDate);

    if (bookedVenueIds.length > 0) {
      filter._id = {
        $nin: bookedVenueIds,
      };
    }
  }

  return filter;
};


/**
 * Get all approved venues or filtered venues.
 */
export const getAvailableVenuesService = async (query = {}) => {
  const filter = await buildVenueFilter(query);

  const venues = await Venue.find(filter).sort({ createdAt: -1 });

  return venues;
};
/**
 * Get one approved active venue by ID.
 */
export const getVenueByIdService = async (venueId) => {
  if (!mongoose.Types.ObjectId.isValid(venueId)) {
    const error = new Error("Invalid venue ID");
    error.statusCode = 400;
    throw error;
  }

  const venue = await Venue.findOne({
    _id: venueId,
    status: "approved",
    isActive: true,
  });

  if (!venue) {
    const error = new Error("Venue not found");
    error.statusCode = 404;
    throw error;
  }

  return venue;
};

/**
 * Get nearby approved venues using user's current location.
 *
 * Frontend sends:
 * lat = latitude
 * lng = longitude
 *
 * MongoDB needs:
 * coordinates: [longitude, latitude]
 */
export const getNearbyVenuesService = async (query = {}) => {
  const { lat, lng, maxDistance = 45000 } = query;

  if (!lat || !lng) {
    const error = new Error("lat and lng are required");
    error.statusCode = 400;
    throw error;
  }

  const latitude = Number(lat);
  const longitude = Number(lng);
  const distance = Number(maxDistance);

  if (
    Number.isNaN(latitude) ||
    Number.isNaN(longitude) ||
    Number.isNaN(distance)
  ) {
    const error = new Error("lat, lng, and maxDistance must be numbers");
    error.statusCode = 400;
    throw error;
  }

  const filter = await buildVenueFilter(query);

  const venues = await Venue.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          // MongoDB expects [longitude, latitude], not [latitude, longitude]
          coordinates: [longitude, latitude],
        },
        distanceField: "distanceMeters",
        maxDistance: distance,
        spherical: true,
        query: filter,
      },
    },
    {
      $addFields: {
        // Convert meters to km and round to 1 decimal place
        distanceKm: {
          $round: [{ $divide: ["$distanceMeters", 1000] }, 1],
        },
      },
    },
    {
      $sort: {
        distanceMeters: 1,
      },
    },
  ]);

  return venues;
};