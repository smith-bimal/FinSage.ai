import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import api from '../config/axios.config.js';

function ResultsPage() {
  const { simulationId } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const response = await api.get(`/simulations/${simulationId}`);
        setSimulation(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch results');
        setTimeout(() => navigate('/dashboard'), 3000);
      } finally {
        setLoading(false);
      }
    };

    if (simulationId) fetchSimulation();
  }, [simulationId, navigate]);

  if (loading) return <CircularProgress />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">Your Financial Future</h1>

        {/* Predictions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white mb-4">Financial Predictions</h2>
          <div className="grid grid-cols-3 gap-4">
            {simulation?.results?.predictions?.map((prediction, i) => (
              <div key={i} className="bg-gray-700 p-4 rounded">
                <h3 className="text-gray-300">{prediction.year} Year{prediction.year > 1 ? 's' : ''}</h3>
                <p className="text-2xl text-white">₹{prediction.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white mb-4">Smart Recommendations</h2>
          <ul className="space-y-2">
            {simulation?.results.recommendations.map((rec, i) => (
              <li key={i} className="text-gray-300">• {rec}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl text-white mb-4">Current vs Future Path</h2>
            {simulation.results.chartData && (
              <LineChart data={simulation.results.chartData.current} />
            )}
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl text-white mb-4">Investment Growth</h2>
            {simulation.results.chartData && (
              <LineChart data={simulation.results.chartData.investmentGrowth} />
            )}
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
