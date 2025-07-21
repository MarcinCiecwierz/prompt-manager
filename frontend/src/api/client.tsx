import axios from "axios";

export const createApiClient = (getAccessToken) => {
  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
  });

  // Request interceptor to add token
  apiClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting access token:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized access");
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};
