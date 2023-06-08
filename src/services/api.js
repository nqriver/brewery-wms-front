import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    if (config.url !== '/managers/login') { // dodaj token tylko gdy to nie jest żądanie logowania
        const token = localStorage.getItem('jwt');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Przekierowanie do strony logowania
        }
        return Promise.reject(error);
    }
);

export default api;
