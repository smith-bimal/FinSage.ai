import React from "react";
import { motion } from "framer-motion";

const SimulationInfo = ({ simulationData }) => {
  return (
    <motion.div
      className="mb-8 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-xl p-4 border border-purple-800/30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{simulationData.title || "Financial Simulation"}</h2>
          <p className="text-gray-300 text-sm mt-1">
            Created: {new Date(simulationData.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center space-x-3">
          <div className="bg-gray-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700/50 flex items-center">
            <span className="font-medium text-sm text-gray-300 mr-2">Market Sentiment:</span>
            <span className={`text-sm px-2 py-0.5 rounded-full ${simulationData.marketSentiment === 'Extreme Fear' ? 'bg-red-900/50 text-red-400' :
              simulationData.marketSentiment === 'Fear' ? 'bg-orange-900/50 text-orange-400' :
                simulationData.marketSentiment === 'Neutral' ? 'bg-yellow-900/50 text-yellow-400' :
                  simulationData.marketSentiment === 'Greed' ? 'bg-green-900/50 text-green-400' :
                    'bg-blue-900/50 text-blue-400'
              }`}>
              {simulationData.marketSentiment || "Neutral"}
            </span>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700/50">
            <span className="font-medium text-sm text-gray-300 mr-2">Accuracy:</span>
            <span className="text-sm text-green-400">{simulationData.accuracyPercentage}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationInfo;
