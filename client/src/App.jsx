import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import NewSimulation from './pages/NewSimulation';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResultsPage from './pages/ResultsPage';
import LandingPage from './pages/LandingPage';
import History from './pages/History';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ChatBot from './pages/ChatBot';

// Enhanced PrivateRoute with support for redirecting back after login
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // Save the current path to redirect after login
  useEffect(() => {
    if (!auth.user && !auth.loading) {
      sessionStorage.setItem('redirectAfterLogin', location.pathname);
    }
  }, [auth.user, auth.loading, location.pathname]);

  // Show loading state while checking auth
  if (auth.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-950 flex items-center justify-center">
        <div className="animate-pulse text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  return auth.user ? children : <Navigate to="/login" state={{ from: location }} />;
};

// Handle redirect after login
const AuthRedirector = () => {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    // If authenticated and on login page, check for redirect
    if (auth.user && location.pathname === '/login') {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/history';
      sessionStorage.removeItem('redirectAfterLogin');
      window.location.href = redirectPath;
    }
  }, [auth.user, location.pathname]);

  return null;
};

function AppRoutes() {
  return (
    <>
      <AuthRedirector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Layout */}
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <ChatBot currentPage="dashboard" />
            </Layout>
          </PrivateRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="new-simulation" element={<NewSimulation />} />
          <Route path="history" element={<History />} />
          <Route path="results/:simulationId" element={<ResultsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// Wrap the entire app with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
