import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url.includes('/books')) { // Solo enviar token en rutas protegidas
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;