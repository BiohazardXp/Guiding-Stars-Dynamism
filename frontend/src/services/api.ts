// src/services/api.ts (or api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // try common storage keys used in this project
  const token =
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('ACCESS_TOKEN') ||
    sessionStorage.getItem('token');

  if (token) {
    if (!config.headers) config.headers = {} as any;
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // helpful debug log when token missing
    // remove or lower verbosity in production
    console.debug('[api] no auth token found for request', config.url);
  }

  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn('[api] 401 Unauthorized - token missing or expired');
      // optional: emit an event or redirect to login here
    }
    return Promise.reject(err);
  }
);

export default api;