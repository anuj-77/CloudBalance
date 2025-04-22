// src/services/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 🔁 change this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Request Interceptor (Add token if needed)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
  
    // Don’t attach token to login or public routes
    const isAuthRoute = config.url.includes('/auth/login') || config.url.includes('/auth/register');
  
    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

// Response Interceptor (error handling)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export default api;
