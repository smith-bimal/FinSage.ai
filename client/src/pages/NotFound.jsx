import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Map } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Main Content */}
      <div className="max-w-3xl w-full bg-black/30 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50 overflow-hidden p-8 md:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* 404 Text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-9xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mt-4 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-md mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            The financial insights you're looking for seem to have wandered off. Let's get you back on track to your wealth-building journey.
          </motion.p>

          {/* Decorative Element */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          ></motion.div>

          {/* Navigation Buttons */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Back Home
            </motion.button>

            <motion.button
              onClick={() => navigate(-1)}
              className="py-3 px-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white font-semibold flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeft className="h-5 w-5 group-hover:translate-x-[-4px] transition-transform" />
              Go Back
            </motion.button>
          </motion.div>

          {/* Additional Navigation */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
            >
              <Map className="h-4 w-4" /> Dashboard
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => navigate('/new-simulation')}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
            >
              <Map className="h-4 w-4" /> New Simulation
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
            >
              <Map className="h-4 w-4" /> Login
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Circular Elements */}
      <motion.div
        className="absolute -bottom-2 -left-2 w-64 h-64 rounded-full bg-purple-700/50 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-700/50 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
};

export default NotFound;