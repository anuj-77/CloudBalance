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
    const requestUrl = error.config?.url || "";

    // ✅ Allow /auth/login errors to be handled in component
    const isLoginRequest = requestUrl.includes('/auth/login');

    if ((status === 401 || status === 403) && !isLoginRequest) {
      localStorage.removeItem('token');
      window.location.href = '/'; // redirect only for protected routes
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
