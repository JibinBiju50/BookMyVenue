import express from "express";

import { uploadVenueImages } from "../controllers/uploadController.js";
import { uploadVenueImagesMiddleware } from "../middleware/uploadMiddleware.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/venue-images",
  authenticate,
  authorize("owner"),
  uploadVenueImagesMiddleware.array("images", 5),
  uploadVenueImages
);

export default router;