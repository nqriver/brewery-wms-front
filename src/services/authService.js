import api from './api';


const login = async (loginData) => {
    try {
        const response = await api.post('/managers/login', loginData);
        localStorage.setItem('jwt', response.data.jwt);
        return true; // zwróć prawdę, jeśli zalogowanie się powiodło
    } catch (error) {
        console.error('Error during login', error);
        return false; // zwróć fałsz, jeśli wystąpił błąd
    }
};

// reszta kodu jest bez zmian

const register = async (registerData) => {
    try {
        const response = await api.post('/managers/register', registerData);
        // Po rejestracji możesz zalogować użytkownika lub przekierować go do strony logowania
    } catch (error) {
        console.error('Error during registration', error);
        // Obsługa błędów rejestracji
    }
};

export { login, register };
