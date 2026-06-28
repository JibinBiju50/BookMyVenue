import { getAvailableVenuesService, getNearbyVenuesService } from "../services/venueService.js";

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