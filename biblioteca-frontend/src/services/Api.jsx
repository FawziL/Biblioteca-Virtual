import axios from 'axios';

const api = axios.create({
    baseURL: 'https://biblioteca-virtual.onrender.com/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && (config.url.includes('/books') || config.url.includes('/favoriteBooks'))) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;