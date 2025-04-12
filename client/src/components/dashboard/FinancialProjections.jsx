/* eslint-disable no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import { Tabs, Tab } from "@mui/material";
import { Loader, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const FinancialProjections = ({ projectionType, setProjectionType, lineData, lineOptions, projections }) => {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-blue-500/30 transition-all duration-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.15)" }}
    >
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center">
          <div className="p-2 bg-blue-600/20 backdrop-blur-md rounded-lg mr-3">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Financial Projections</h2>
        </div>
        <Tabs
          value={projectionType}
          onChange={(e, newValue) => setProjectionType(newValue)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#60a5fa" } }}
          sx={{ minHeight: 'auto' }}
        >
          <Tab value="shortTerm" label="Short Term" sx={{ color: "#cbd5e1", fontSize: "0.8rem", padding: '6px 12px', minHeight: 'auto', minWidth: 'auto', '&.Mui-selected': { color: "#60a5fa", fontWeight: 600 } }} />
          <Tab value="longTerm" label="Long Term" sx={{ color: "#cbd5e1", fontSize: "0.8rem", padding: '6px 12px', minHeight: 'auto', minWidth: 'auto', '&.Mui-selected': { color: "#60a5fa", fontWeight: 600 } }} />
        </Tabs>
      </div>
      <div className="h-[320px]">
        {projections[projectionType].timestamps ? (
          <Line data={lineData} options={lineOptions} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 text-purple-500 animate-spin mb-4" />
          <p className="text-xl text-gray-300">Loading future data...</p>
        </div>
          </div>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-800/50 flex justify-between text-xs text-gray-400 relative z-10">
        <div>
          <span className="font-medium text-gray-300">Projected Growth:</span> 
          {projectionType === 'shortTerm' ? 
            `+${Math.round(((projections.shortTerm.recommendedValues[projections.shortTerm.recommendedValues.length-1] / projections.shortTerm.recommendedValues[0]) - 1) * 100)}%` : 
            `+${Math.round(((projections.longTerm.recommendedValues[projections.longTerm.recommendedValues.length-1] / projections.longTerm.recommendedValues[0]) - 1) * 100)}%`
          }
        </div>
        <div>
          <span className="font-medium text-gray-300">Timeframe:</span> 
          {projectionType === 'shortTerm' ? 
            `${projections.shortTerm.timestamps.length} months` : 
            `${projections.longTerm.timestamps.length} years`
          }
        </div>
      </div>
    </motion.div>
  );
};

export default FinancialProjections;
