import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProfileCard = ({
  id,
  name,
  date,
  thumbnail,
  totalRevenue,
  income,
  expenses,
  status,
  prediction,
  accuracy,
  onClick
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5 }
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
      className="glass-card purple-glow rounded-xl cursor-pointer overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>

        {/* Background animated glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              {/* <div className="relative w-16 h-16 rounded-lg overflow-hidden group">
                <img 
                  src={thumbnail} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  onError={(e) => {
                    e.target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                <div className="absolute bottom-1 right-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-bold text-white border border-white/20">
                    {id}
                  </div>
                </div>
              </div> */}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-200">
                  {name}
                </h3>
                <StatusBadge status={status} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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
                    {predictionDetails.icon}
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
    </motion.div>
  );
};

export default ProfileCard;
