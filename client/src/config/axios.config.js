import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Create a central navigation handler for auth redirects
let navigationFunction = null;
export const setNavigationFunction = (navFunction) => {
    navigationFunction = navFunction;
};

// Request interceptor to add auth token
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
            if (!window.location.pathname.includes('/login')) {
                // Store the current location to redirect back after login
                sessionStorage.setItem('redirectAfterLogin', window.location.pathname);

                // Use React Router navigation if available, otherwise fall back to window.location
                if (navigationFunction) {
                    navigationFunction('/login');
                } else {
                    // Fallback for non-React components or during initialization
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
