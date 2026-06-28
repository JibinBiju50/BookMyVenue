import mongoose from "mongoose";
import Venue from "../models/Venue.js";
import BookingInquiry from "../models/BookingInquiry.js";

export const getAvailableVenuesService = async (query = {}) => {
  const filter = await buildVenueFilter(query);

  const venues = await Venue.find(filter).sort({ createdAt: -1 });

  return venues;
};

export const getNearbyVenuesService = async (query) => {
  const { lat, lng, maxDistance = 15000 } = query;

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

  filter.location = {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      // Distance is in meters. Default 15000 = 15 km.
      $maxDistance: distance,
    },
  };

  const venues = await Venue.find(filter);

  return venues;
};