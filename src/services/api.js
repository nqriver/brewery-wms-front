// api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

// Mapa kodów błędów
const errorCodes = {
    "BMS01": "Dostęp do tego browaru jest zabroniony",
    "BMS02": "Nie można znaleźć browaru",
    "BMS03": "Użytkownik z wybranym adresem email już istnieje",
    "BMS04": "Użytkownik z wybranym loginem już istnieje",
    "BMS05": "Nie można znaleźć menadżera",
    "BMS06": "Ten browar nie jest zarządzany przez wybranego menadżera",
    "BM07": "Nie można znaleźć stylu piwa",
    "BM08": "Nie można znaleźć piwa",
    "BMS09" : "To piwo jest już produkowane przez ten browar"
};

api.interceptors.request.use((config) => {
    if (config.url !== '/managers/login' && config.url !== 'managers/register') { // dodaj token tylko gdy to nie jest żądanie logowania
        const token = localStorage.getItem('jwt');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            }
            return Promise.reject('Niepoprawne dane uwierzytelniające');
        }
        if (error.response.data && error.response.data.code) {
            return Promise.reject(errorCodes[error.response.data.code] || error.response.data.message);
        }
        return Promise.reject(error);
    }
);

export default api;
