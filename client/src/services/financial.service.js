import api from '../config/axios.config.js';

export const financialService = {
  getFinancialData: async (userId) => {
    try {
      const response = await api.get(`/financial/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateFinancialData: async (userId, data) => {
    try {
      const response = await api.post(`/financial/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
