import { Routes, Route, Navigate } from 'react-router';
import Dashboard from './pages/Dashboard';
import NewSimulation from './pages/NewSimulation';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResultsPage from './pages/ResultsPage';
import SimulationWizard from './pages/SimulationWizard';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new-simulation" element={<SimulationWizard />} />
        <Route path="results/:simulationId" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
