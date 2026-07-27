import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api",
  withCredentials: true,
});

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // just reject error
    return Promise.reject(error);
  }
);