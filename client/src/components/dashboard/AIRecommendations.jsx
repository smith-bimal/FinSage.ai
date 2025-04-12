/* eslint-disable no-unused-vars */
import React from "react";
import { Cpu, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const AIRecommendations = ({ recommendations }) => {
  return (
    <motion.div
      className="bg-black/30 h-full backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-blue-500/30 transition-all duration-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.15)" }}
    >
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center">
          <div className="p-2 bg-blue-600/20 backdrop-blur-md rounded-lg mr-3">
            <Cpu className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
        </div>
        <span className="text-xs inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 backdrop-blur-md">AI Generated</span>
      </div>
      <div className="space-y-5 relative z-10">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec._id}
            className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer group relative overflow-hidden"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex justify-between mb-2 items-start">
                <span className="text-sm font-medium text-blue-400">{rec.category}</span>
                <div className="flex items-center bg-blue-900/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-blue-700/50">
                  <span className="text-xs text-blue-300">{rec.confidenceScore}% Confidence</span>
                </div>
              </div>
              <p className="text-white text-sm mb-1 group-hover:text-blue-100 transition-colors">{rec.action}</p>
              <p className="text-xs text-gray-400 mb-2 line-clamp-2">{rec.rationale}</p>
              <div className="flex justify-between text-xs">
                <span className="text-green-400 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> Monthly: +${rec.potentialImpact.monthly}</span>
                <span className="text-green-400 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> Yearly: +${rec.potentialImpact.yearly}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
          </motion.div>
        ))}
        <motion.button
          className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-blue-600/50 rounded-lg transition-colors flex items-center justify-center group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          View All Recommendations
          <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
