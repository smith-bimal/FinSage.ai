/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, change, color, iconBg, iconText, index }) => {
  return (
    <motion.div
      className={`bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition-colors`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 }, boxShadow: "0 15px 30px -10px rgba(131, 56, 236, 0.15)" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-20 transition-opacity duration-300`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconBg} backdrop-blur-md`}>
          {React.cloneElement(icon, { className: `h-5 w-5 ${iconText}` })}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2 relative z-10">{change}</p>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-80 group-hover:w-32 group-hover:h-32 transition-all duration-300"></div>
    </motion.div>
  );
};

export default StatCard;
