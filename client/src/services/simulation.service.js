import api from '../config/axios.config.js';

export const simulationService = {
    createSimulation: async (userId, simulationData) => {
        try {
            const response = await api.post(`/simulations/${userId}`, simulationData);
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
    },

    getSimulationWithBehavior: async (userId) => {
        try {
            const response = await api.get(`/simulations/${userId}/behavior`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateSimulation: async (simulationId, updates) => {
        try {
            const response = await api.put(`/simulations/${simulationId}`, updates);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteSimulation: async (simulationId) => {
        try {
            const response = await api.delete(`/simulations/${simulationId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
