import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach the auth token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors by logging out the user
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
