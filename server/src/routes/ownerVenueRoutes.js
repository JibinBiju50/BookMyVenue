import express from "express";

import {
  createOwnerVenue,
  getOwnerVenues,
} from "../controllers/ownerVenueController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("owner"));

router.post("/", createOwnerVenue);
router.get("/", getOwnerVenues);

export default router;