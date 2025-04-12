import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3, Clock, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProfileCard = ({
  name,
  date,
  totalRevenue,
  income,
  expenses,
  status,
  prediction,
  accuracy,
  onClick,
  onDelete // Add onDelete prop
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -2 }
  };

  // Get prediction icon and color
  const getPredictionDetails = () => {
    if (prediction === "Bullish") {
      return {
        icon: <TrendingUp className="h-4 w-4 text-green-400" />,
        color: "text-green-400"
      };
    } else if (prediction === "Bearish") {
      return {
        icon: <TrendingDown className="h-4 w-4 text-red-400" />,
        color: "text-red-400"
      };
    } else {
      return {
        icon: <BarChart3 className="h-4 w-4 text-yellow-400" />,
        color: "text-yellow-400"
      };
    }
  };

  const predictionDetails = getPredictionDetails();

  return (
    <motion.div
      className="glass-card purple-glow rounded-xl overflow-hidden relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.2 }}
      onClick={onClick} // Move onClick back to the main container
    >
      <div className="relative">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>

        {/* Background animated glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Delete button - positioned in the top-right corner */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation(); // Ensure this stops propagation
            onDelete(e);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-red-600/50 text-gray-400 hover:text-white transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={16} />
        </motion.button>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start">
                <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-200">
                  {name}
                </h3>
                {/* Status badge moved to the top stats row to prevent overlap with delete button */}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {/* Added Status Badge as first item in the grid */}
                <div className="space-y-1">
                  <div className="flex items-center text-purple-300/70 text-xs font-medium">
                    <span>Status</span>
                  </div>
                  <div className="pt-1">
                    <StatusBadge status={status} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-purple-300/70 text-xs font-medium">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span>Revenue</span>
                  </div>
                  <p className="font-medium text-white/80">
                    {totalRevenue}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-purple-300/70 text-xs font-medium">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Prediction</span>
                  </div>
                  <p className={`font-medium ${predictionDetails.color}`}>
                    {prediction}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-purple-300/70 text-xs font-medium">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Date</span>
                  </div>
                  <p className="font-medium text-white/80">
                    {date}
                  </p>
                </div>
              </div>

              {/* Financial Stats Section */}
              <div className="pt-2">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-purple-300/70 mb-1">Income</p>
                      <p className="text-sm font-semibold text-white">{income}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-300/70 mb-1">Expenses</p>
                      <p className="text-sm font-semibold text-white">{expenses}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-300/70 mb-1">Accuracy</p>
                      <p className="text-sm font-semibold text-green-400">{accuracy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="mt-4 flex justify-end">
            <motion.div
              className="group flex items-center gap-1 text-sm text-purple-400 hover:text-white transition-colors duration-300 font-medium"
              whileHover={{ x: 3 }}
            >
              <span>View Full Simulation</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div >
  );
};

export default ProfileCard;
