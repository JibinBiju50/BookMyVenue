import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Important because your auth tokens are stored in HTTP-only cookies
  withCredentials: true,
});

export default apiClient;