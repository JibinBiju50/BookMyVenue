import express from 'express';
import { getVenues, getNearbyVenues, getVenueById } from "../controllers/venueController.js";

const router = express.Router();

// Public venue search/listing route
router.get("/", getVenues);

// Public nearby venue route
// Must come before "/:id"
router.get("/nearby", getNearbyVenues);

router.get("/:id", getVenueById);

export default router;