import Venue from "../models/Venue.js";

export const createOwnerVenueService = async ({ ownerId, venueData }) => {
  const venue = await Venue.create({
    ...venueData,
    owner: ownerId,
    status: "pending",
    isActive: true,
    isSeed: false,
  });

  return venue;
};

export const getOwnerVenuesService = async (ownerId) => {
  const venues = await Venue.find({
    owner: ownerId,
  }).sort({ createdAt: -1 });

  return venues;
};