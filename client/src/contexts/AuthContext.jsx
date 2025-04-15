import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../services/auth.service.js';

// Create the context with default values
const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithCredentials: () => {},
  registerWithCredentials: () => {},
  logout: () => {},
  updateUser: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      const userData = await authService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (err) {
      console.error('Authentication error:', err);
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
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithCredentials = async (credentials) => {
    const data = await authService.login(credentials);
    if (data.token && (data.userId || (data.user && data.user._id))) {
      const userId = data.userId || (data.user && data.user._id);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', userId);
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
      } else {
        setUser({ _id: userId });
      }
      navigate('/history');
    } else {
      throw new Error('Authentication successful but user data is incomplete.');
    }
  };

  const registerWithCredentials = async (userData) => {
    const data = await authService.register(userData);
    if (data.token && (data.userId || (data.user && data.user._id))) {
      const userId = data.userId || (data.user && data.user._id);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', userId);
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
      } else {
        setUser({ _id: userId });
      }
      navigate('/history');
    } else {
      throw new Error('Registration successful but user data is incomplete.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value = {
    user,
    loading,
    loginWithCredentials,
    registerWithCredentials,
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