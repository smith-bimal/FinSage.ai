import api from '../config/axios.config.js';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            console.log('Login API response:', response.data);
            
            // Store token and user details in localStorage
            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error.response?.data || error.message;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            console.log('Register API response:', response.data);
            
            // Auto-login after successful registration
            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
        // Force redirect to home page
        window.location.href = '/';
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
        return !!localStorage.getItem('token');
    }
};
