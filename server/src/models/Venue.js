import mongoose from "mongoose";

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

    // renamed from "type" to "category" for consistency across schema, API, frontend
    category: {
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
      required: [true, "Venue category is required"],
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
        // [longitude, latitude] — GeoJSON standard
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
    },

    images: {
      type: [String],
      default: [],
    },

    contactInfo: {
      phone: String,
      email: String,
      website: String,
    },

    // seed venues → "approved" (visible in listings immediately)
    // owner-submitted venues → "pending" by default (Week 2 admin review)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // marks sample/seed venues so seeder never deletes real owner data
    isSeed: {
      type: Boolean,
      default: false,
    },

    // rating removed — reviews are out of scope for Phase 1 MVP

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Geo index — powers "Use Current Location" $near queries
venueSchema.index({ location: "2dsphere" });

// Text index — powers keyword search by name / town / district
venueSchema.index({ name: "text", town: "text", district: "text" });

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;