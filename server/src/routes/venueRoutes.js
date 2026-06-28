import { getNearbyVenues } from "../controllers/venueController";
import express from 'express';

const router = express.Router();

// Public venue search/listing route
router.get("/", getVenues);

// Public nearby venue route
// Must come before "/:id"
router.get("/nearby", getNearbyVenues);