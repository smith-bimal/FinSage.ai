import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios.config.js';

// Create the context with default values
const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Try to fetch current user data
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (err) {
      console.error('Authentication error:', err);
      // If API call fails, try to use stored user data as fallback
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setUser(parsedUserData);
          console.log('Using stored user data:', parsedUserData);
        } catch (parseErr) {
          console.error('Error parsing stored user data:', parseErr);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userData');
        }
      } else {
        // Clear invalid tokens if no stored data
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userData._id);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    
    // After login, redirect to history page
    window.location.href = '/history';
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    setUser(null);
    
    // After logout, redirect to home page
    window.location.href = '/';
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);