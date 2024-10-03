import axios from 'axios';

const baseURL = import.meta.env.VITE_ENV === 'development'
    ? "http://localhost:8080/api"
    : "https://biblioteca-virtual.onrender.com"

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && (config.url.includes('/books') || config.url.includes('/favoriteBooks'))) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;