// src/services/api.ts (or api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // try common storage keys used in this project
  const token =
    localStorage.getItem('admin_token') ||
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('ACCESS_TOKEN') ||
    sessionStorage.getItem('token');

  console.log('[api] Checking tokens:', {
    admin_token: localStorage.getItem('admin_token'),
    token: localStorage.getItem('token'),
    authToken: localStorage.getItem('authToken'),
    found_token: token ? 'YES' : 'NO'
  });

  if (token) {
    if (!config.headers) config.headers = {} as any;
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[api] Adding Authorization header:', config.headers.Authorization);
  } else {
    console.warn('[api] no auth token found for request', config.url);
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