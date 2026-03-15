import axios from 'axios';

// Create a central axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

// Automatically attach the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
