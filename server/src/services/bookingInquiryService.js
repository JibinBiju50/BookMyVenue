import mongoose from "mongoose";
import BookingInquiry from "../models/BookingInquiry.js";
import Venue from "../models/Venue.js";

const isValidDateString = (date) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

export const createBookingInquiryService = async (data) => {
  const {
    venueId,
    customerName,
    customerPhone,
    customerEmail,
    eventDate,
    guestCount,
    message,
    userId = null,
  } = data;

  if (!mongoose.Types.ObjectId.isValid(venueId)) {
    const error = new Error("Invalid venue ID");
    error.statusCode = 400;
    throw error;
  }

  if (!eventDate || !isValidDateString(eventDate)) {
    const error = new Error("Event date must be in YYYY-MM-DD format");
    error.statusCode = 400;
    throw error;
  }

  const venue = await Venue.findOne({
    _id: venueId,
    status: "approved",
    isActive: true,
  });

  if (!venue) {
    const error = new Error("Venue not found or not available");
    error.statusCode = 404;
    throw error;
  }

  const alreadyBooked = await BookingInquiry.findOne({
    venue: venue._id,
    eventDate,
    status: "accepted",
  });

  if (alreadyBooked) {
    const error = new Error("This venue is already booked for the selected date");
    error.statusCode = 409;
    throw error;
  }

  const bookingInquiry = await BookingInquiry.create({
    venue: venue._id,
    user: userId,
    owner: venue.owner || null,
    customerName,
    customerPhone,
    customerEmail,
    eventDate,
    guestCount: Number(guestCount),
    message,
  });

  return bookingInquiry;
};

export const getOwnerBookingInquiriesService = async (ownerId) => {
  const inquiries = await BookingInquiry.find({
    owner: ownerId,
  })
    .populate("venue", "name district town images pricing capacity")
    .sort({ createdAt: -1 });

  return inquiries;
};

export const updateBookingInquiryStatusService = async ({
  inquiryId,
  ownerId,
  status,
}) => {
  if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
    const error = new Error("Invalid inquiry ID");
    error.statusCode = 400;
    throw error;
  }

  if (!["accepted", "rejected"].includes(status)) {
    const error = new Error("Status must be accepted or rejected");
    error.statusCode = 400;
    throw error;
  }

  const inquiry = await BookingInquiry.findOne({
    _id: inquiryId,
    owner: ownerId,
  });

  if (!inquiry) {
    const error = new Error("Booking inquiry not found");
    error.statusCode = 404;
    throw error;
  }

  if (status === "accepted") {
    const existingAcceptedInquiry = await BookingInquiry.findOne({
      _id: { $ne: inquiry._id },
      venue: inquiry.venue,
      eventDate: inquiry.eventDate,
      status: "accepted",
    });

    if (existingAcceptedInquiry) {
      const error = new Error("Another inquiry is already accepted for this venue and date");
      error.statusCode = 409;
      throw error;
    }
  }

  inquiry.status = status;

  await inquiry.save();

  return inquiry;
};