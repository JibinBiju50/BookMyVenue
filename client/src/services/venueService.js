import apiClient from "./apiClient.js";

export const getVenues = async (filters = {}) => {
  const response = await apiClient.get("/venues", {
    params: filters,
  });

  return response.data;
};

export const getNearbyVenues = async (filters = {}) => {
  const response = await apiClient.get("/venues/nearby", {
    params: filters,
  });

  return response.data;
};