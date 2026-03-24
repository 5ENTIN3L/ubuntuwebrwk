import axios from 'axios';

// Add this type declaration for Vite env support
interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
}

// Extend the global ImportMeta interface for Vite env support
declare global {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
