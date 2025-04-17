import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Create a navigation handler for React Router integration
let navHandler = null;

export const setNavigationHandler = (navigate) => {
    navHandler = navigate;
};

// Request interceptor to add auth token and handle data for requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Handle data for POST, PUT, PATCH requests
        if (['post', 'put', 'patch'].includes(config.method?.toLowerCase())) {
            // If sending FormData (for files), let browser set correct content type
            if (config.data instanceof FormData) {
                delete config.headers['Content-Type'];
            } 
            // For regular JSON data, ensure it's properly formatted
            else if (config.data && typeof config.data === 'object') {
                config.headers['Content-Type'] = 'application/json';
                // config.data is already handled by axios
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized or 403 Forbidden responses globally
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Clear auth data
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userData');
            
            // Don't redirect from login page to avoid redirect loops
            const pathname = window.location.pathname;
            if (!pathname.includes('/login')) {
                // Store the current location to redirect back after login
                sessionStorage.setItem('redirectAfterLogin', pathname);
                
                // Use React Router navigation if available
                if (navHandler) {
                    navHandler('/login');
                } else {
                    // Fallback only when React Router is not available
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
