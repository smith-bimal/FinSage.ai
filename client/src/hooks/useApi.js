import { useState } from 'react';
import api from '../config/axios.config';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url: endpoint,
        data
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, callApi };
};