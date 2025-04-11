import api from '../config/axios.config.js';

export const simulationService = {
  createSimulation: async (userId, data) => {
    try {
      const response = await api.post(`/simulations/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getSimulationResults: async (simulationId) => {
    try {
      const response = await api.get(`/simulations/result/${simulationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserSimulations: async (userId) => {
    try {
      const response = await api.get(`/simulations/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
