import api from '../config/axios.config.js';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            // Only return API response data
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            // Only return API response data
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        // No localStorage or redirect here; handled by context
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    isAuthenticated: () => {
        // No localStorage check here; handled by context
        return false;
    }
};
