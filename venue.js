const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "banquet_hall",
        "auditorium",
        "convention_center",
        "outdoor",
        "rooftop",
        "resort",
        "hotel_ballroom",
        "community_hall",
        "wedding_hall",
        "conference_room",
      ],
      required: [true, "Venue type is required"],
    },

    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },

    town: {
      type: String,
      required: [true, "Town/Area is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        // [longitude, latitude]
        type: [Number],
        required: [true, "Coordinates are required"],
      },
    },

    capacity: {
      min: { type: Number, default: 0 },
      max: { type: Number, required: [true, "Maximum capacity is required"] },
    },

    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
      },
      currency: {
        type: String,
        default: "INR",
      },
      pricingModel: {
        type: String,
        enum: ["per_day", "per_hour", "per_event"],
        default: "per_day",
      },
    },

    amenities: {
      type: [String],
      default: [],
      // e.g. ["AC", "Parking", "Catering", "Projector", "WiFi", "Stage", "Dressing Room"]
    },

    images: {
      type: [String], // Array of image URLs
      default: [],
    },

    contactInfo: {
      phone: String,
      email: String,
      website: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // will be linked once owner auth is added
    },
  },
  {
    timestamps: true,
  }
);

// Geo index for proximity searches ($near queries)
venueSchema.index({ location: "2dsphere" });

// Text index for search by name / town / district
venueSchema.index({ name: "text", town: "text", district: "text" });

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
