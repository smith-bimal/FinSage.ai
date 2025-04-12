/* eslint-disable no-unused-vars */
import React from "react";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { FNGSvg, FNGLabels } from '../FNGComponents';

const SavingsMeter = ({ savingsPercentage, savingsAmount, formatter }) => {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-purple-500/30 transition-all duration-300 relative h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ boxShadow: "0 15px 30px -10px rgba(131, 56, 236, 0.15)" }}
    >
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center">
          <div className="p-2 bg-purple-600/20 backdrop-blur-md rounded-lg mr-3">
            <BarChart3 className="h-5 w-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Savings Meter</h2>
        </div>
        <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs border backdrop-blur-md ${savingsPercentage >= 20 ? 'bg-green-900/30 border-green-700/30 text-green-400' : savingsPercentage >= 10 ? 'bg-yellow-900/30 border-yellow-700/30 text-yellow-400' : 'bg-red-900/30 border-red-700/30 text-red-400'}`}>
          {savingsPercentage >= 20 ? "On Track" : savingsPercentage >= 10 ? "Improving" : "Needs Attention"}
        </span>
      </div>
      
      <div className="flex-grow flex flex-col justify-between max-h-68">
        <div className="mb-2 text-center">
          <h3 className="text-lg text-gray-400 font-medium">Current Savings</h3>
          <p className="text-3xl font-bold text-white mt-1">{formatter.format(savingsAmount)}</p>
        </div>
        
        <div className="relative flex-grow">
          <FNGSvg 
            savingsPercentage={savingsPercentage} 
            savingsAmount={savingsAmount}
            formatter={formatter}
          />
          <FNGLabels />
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-2">
          <p className="mb-1">Target: 20% of Income</p>
          <p className={savingsPercentage >= 20 ? "text-green-400" : savingsPercentage >= 10 ? "text-yellow-400" : "text-red-400"}>
            {savingsPercentage >= 20 ? "Great job! You're meeting your savings target." : savingsPercentage >= 10 ? "Almost there! Try to increase your savings." : "Your savings rate needs attention."}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SavingsMeter;
