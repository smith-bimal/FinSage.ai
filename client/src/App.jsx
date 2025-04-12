import { Routes, Route, Navigate } from 'react-router';
import Dashboard from './components/Dashboard';
import NewSimulation from './pages/NewSimulation';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResultsPage from './pages/ResultsPage';
import LandingPage from './pages/LandingPage';
import History from './pages/History';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}> */}
      <Route path="/history" element={<History />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-simulation" element={<NewSimulation />} />
      <Route path="/results/:simulationId" element={<ResultsPage />} />
      <Route path="/*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
