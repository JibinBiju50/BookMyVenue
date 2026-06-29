import { getAvailableVenuesService, getNearbyVenuesService, getVenueByIdService } from "../services/venueService.js";

export const getVenues = async (req, res) => {
  try {
    const venues = await getAvailableVenuesService(req.query);

    res.status(200).json({
      success: true,
      count: venues.length,
      data: venues,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch venues",
    });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const venue = await getVenueByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: venue,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch venue",
    });
  }
};

export const getNearbyVenues = async (req, res) => {
  try {
    const venues = await getNearbyVenuesService(req.query);

    res.status(200).json({
      success: true,
      count: venues.length,
      data: venues,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch nearby venues",
    });
  }
};