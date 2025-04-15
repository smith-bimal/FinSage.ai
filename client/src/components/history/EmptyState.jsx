import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      className="bg-gray-900/30 backdrop-blur-md text-center p-10 rounded-xl border border-gray-800/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-lg font-medium text-white mb-2">No simulations found</h3>
      <p className="text-gray-400 mb-4">
        Try adjusting your filters or creating a new simulation.
      </p>
      <button
        onClick={() => navigate('/new-simulation')}
        className="py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all rounded-lg text-white text-sm font-medium"
      >
        Create New Simulation
      </button>
    </motion.div>
  );
};

export default EmptyState;
