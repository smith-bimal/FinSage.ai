/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { PieChart as PieChartIcon } from "lucide-react";
import { motion } from "framer-motion";

const ExpenseBreakdownChart = ({ doughnutData, doughnutOptions, totalExpenses }) => {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ boxShadow: "0 15px 30px -10px rgba(131, 56, 236, 0.15)" }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-purple-600/20 backdrop-blur-md rounded-lg mr-3">
            <PieChartIcon className="h-5 w-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Expense Breakdown</h2>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800/50 backdrop-blur-md px-2 py-1 rounded-full border border-gray-700/50">Monthly</span>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full min-h-40 relative">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <p className="text-2xl font-bold text-white">{totalExpenses}</p>
            <p className="text-xs text-gray-400">Total Expenses</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseBreakdownChart;
