// src/services/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isAuthRoute = config.url.includes('/auth/login') || config.url.includes('/auth/register');

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Token expired, invalid or forbidden
      localStorage.removeItem('token');  // Clear token

      // Optional: Clear any other auth-related storage if needed

      // Redirect to login page
      window.location.href = '/';
    }

    const customError = {
      status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export default api;
