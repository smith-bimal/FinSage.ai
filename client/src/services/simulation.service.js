import api from '../config/axios.config.js';

export const simulationService = {
    createSimulation: async (simulationData) => {
        try {
            const response = await api.post('/simulations', simulationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUserSimulations: async (userId) => {
        try {
            const response = await api.get(`/simulations/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
