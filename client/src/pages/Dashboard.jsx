import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../config/axios.config';
import FNG from '../components/FNG';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/simulations/dashboard/me');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };
    fetchDashboard();
  }, []);

  const startNewSimulation = () => {
    navigate('/new-simulation');
  };

  const viewSimulation = (simulationId) => {
    navigate(`/results/${simulationId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        <button
          onClick={startNewSimulation}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          New Simulation
        </button>
      </div>

      <FNG />
      <LoadingSpinner />

      {dashboardData?.recentSimulations?.map(simulation => (
        <div
          key={simulation._id}
          onClick={() => viewSimulation(simulation._id)}
          className="bg-gray-800 p-4 rounded mb-4 cursor-pointer"
        >
          <h3>Scenario: {simulation.futureState.scenario}</h3>
          <p>Projected Value: ₹{simulation.results.year1.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
