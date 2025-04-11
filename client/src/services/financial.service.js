import api from '../config/axios.config.js';

export const financialService = {
    getFinancialData: async (userId) => {
        try {
            const response = await api.get(`/financial/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createFinancialData: async (userId, financialData) => {
        try {
            const response = await api.post(`/financial/${userId}`, financialData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateFinancialData: async (userId, updates) => {
        try {
            const response = await api.put(`/financial/${userId}`, updates);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFinancialProfile: async (userId) => {
        try {
            const response = await api.get(`/user/${userId}/financial-profile`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
