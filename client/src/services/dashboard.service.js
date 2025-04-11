import api from '../config/axios.config.js';

export const dashboardService = {
    getUserSummary: async (userId) => {
        const response = await api.get(`/users/${userId}/summary`);
        return response.data;
    },

    getSimulations: async (userId) => {
        const response = await api.get(`/simulations/user/${userId}`);
        return response.data;
    },

    getChartData: async (userId) => {
        const response = await api.get(`/simulations/chart/${userId}`);
        return response.data;
    },

    getRecommendations: async (userId) => {
        const response = await api.post(`/ai/recommendations`, { userId });
        return response.data;
    }
};
