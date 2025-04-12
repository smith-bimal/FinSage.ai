import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/history.css';
import { 
  ChevronDown, 
  Calendar, 
  Filter, 
  DownloadCloud, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  ArrowRight,
  Search
} from 'lucide-react';

import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ProfileCard from '../components/ProfileCard';
import StatusBadge from '../components/StatusBadge';

// Sample data
const profiles = [
  {
    id: 1,
    name: "Profile 1 - Extreme Fear",
    date: "2024-04-12",
    thumbnail: "/images/profile1-thumbnail.png",
    totalRevenue: "$4,500",
    income: "$7,000",
    expenses: "$2,350",
    status: "Extreme Fear",
    prediction: "Bearish",
    accuracy: "92%"
  },
  {
    id: 2,
    name: "Profile 2 - Fear",
    date: "2024-04-10",
    thumbnail: "/images/profile2-thumbnail.png",
    totalRevenue: "$5,200",
    income: "$8,100",
    expenses: "$3,000",
    status: "Fear",
    prediction: "Bearish",
    accuracy: "85%"
  },
  {
    id: 3,
    name: "Profile 3 - Neutral",
    date: "2024-04-08",
    thumbnail: "/images/profile3-thumbnail.png",
    totalRevenue: "$3,800",
    income: "$6,500",
    expenses: "$2,100",
    status: "Neutral",
    prediction: "Neutral",
    accuracy: "78%"
  },
  {
    id: 4,
    name: "Profile 4 - Greed",
    date: "2024-04-06",
    thumbnail: "/images/profile4-thumbnail.png",
    totalRevenue: "$6,300",
    income: "$9,200",
    expenses: "$2,900",
    status: "Greed",
    prediction: "Bullish",
    accuracy: "88%"
  },
  {
    id: 5,
    name: "Profile 5 - Extreme Greed",
    date: "2024-04-04",
    thumbnail: "/images/profile5-thumbnail.png",
    totalRevenue: "$7,800",
    income: "$11,000",
    expenses: "$3,200",
    status: "Extreme Greed",
    prediction: "Bullish",
    accuracy: "95%"
  }
] 

const History = () => {
  const [scrollY, setScrollY] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter profiles based on search, status, and date
  const filteredProfiles = profiles.filter(profile => {
    // Search filter
    const matchesSearch = profile.name.toLowerCase().includes(search.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === 'all' ? true : profile.status === filterStatus;
    
    // Date filter
    const matchesDate = selectedDate 
      ? new Date(profile.date).toISOString().split('T')[0] === selectedDate
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sort the filtered profiles based on sortOrder
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === 'highest-revenue') {
      return parseFloat(b.totalRevenue.replace('$', '').replace(',', '')) - 
             parseFloat(a.totalRevenue.replace('$', '').replace(',', ''));
    } else {
      return parseFloat(a.totalRevenue.replace('$', '').replace(',', '')) - 
             parseFloat(b.totalRevenue.replace('$', '').replace(',', ''));
    }
  });

  // Animation variants for staggered list
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13071F] via-[#2D0F45] to-[#13071F] overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-screen">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-purple-600/10 opacity-60"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.3, 0.5] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl bg-blue-600/10 opacity-40"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
        
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-br from-purple-800/20 to-transparent blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-blue-800/20 to-transparent blur-2xl"></div>
        </div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0.2 + Math.random() * 0.4,
                scale: Math.random() * 0.2 + 0.1,
              }}
              animate={{
                x: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%"
                ],
                y: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%"
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 30 + 20,
                ease: "linear"
              }}
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <Header scrollY={scrollY} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-28 pb-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <motion.div 
            className="lg:col-span-3 flex flex-col space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Current Summary */}
            <div className="glass-card rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
              
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                Recent Activity
              </h3>
              
              {/* Summary Data */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Total Simulations</span>
                    <span className="text-xs text-purple-400">This Month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">{profiles.length}</span>
                    <div className="flex items-center text-green-400 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+12.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Avg. Accuracy</span>
                    <span className="text-xs text-purple-400">All Time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">87.6%</span>
                    <div className="flex items-center text-green-400 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+3.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Current Market</span>
                    <span className="text-xs text-purple-400">Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <StatusBadge status="Fear" className="text-[10px] py-0.5 px-2" />
                    <div className="flex items-center text-red-400 text-xs">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      <span>-2.1%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="mt-5 w-full text-center text-sm py-2 px-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-gray-300 font-medium border border-white/10">
                View Analytics
              </button>
            </div>
            
            {/* Advanced Filters */}
            <div className="glass-card rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
              
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-blue-400" />
                Advanced Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Sort By</label>
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest-revenue">Highest Revenue</option>
                    <option value="lowest-revenue">Lowest Revenue</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Prediction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors">
                      Bullish
                    </button>
                    <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors">
                      Bearish
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Accuracy Range</label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="75"
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-white">75%+</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 flex space-x-2">
                <button className="flex-1 text-center text-sm py-2 px-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white font-medium">
                  Apply
                </button>
                <button className="text-center text-sm py-2 px-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-gray-300 font-medium border border-white/10">
                  Reset
                </button>
              </div>
            </div>
            
            {/* Export Section */}
            <div className="glass-card rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-500/10 blur-xl rounded-full"></div>
              
              <div className="flex items-center mb-4">
                <DownloadCloud className="h-4 w-4 mr-2 text-purple-400" />
                <h3 className="font-semibold text-white">Export Data</h3>
              </div>
              
              <p className="text-xs text-gray-400 mb-4">
                Export your simulation history in multiple formats for further analysis or reporting.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
                  <span>CSV</span>
                </button>
                <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
                  <span>PDF</span>
                </button>
                <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
                  <span>Excel</span>
                </button>
                <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
                  <span>JSON</span>
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Simulation History
              </h1>
              <p className="text-purple-300/70">
                Review your previous financial simulations and track performance over time
              </p>
            </motion.div>

            {/* Filter Bar */}
            <FilterBar 
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            {/* Results Count */}
            <div className="text-sm text-purple-300/80 flex items-center justify-between mb-4">
              <span>
                {sortedProfiles.length} {sortedProfiles.length === 1 ? 'result' : 'results'} found
              </span>
              <button className="text-xs flex items-center text-purple-400 hover:text-white transition-colors">
                <Search className="h-3 w-3 mr-1" />
                Advanced Search
              </button>
            </div>

            {/* Profile List */}
            <motion.div 
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedProfiles.length > 0 ? (
                sortedProfiles.map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    {...profile}
                    onClick={() => navigate(`/dashboard/${profile.id}`)}
                  />
                ))
              ) : (
                <motion.div 
                  className="glass-card text-center p-10 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-medium text-white mb-2">No simulations found</h3>
                  <p className="text-purple-300/70 mb-4">
                    Try adjusting your filters or creating a new simulation.
                  </p>
                  <button className="py-2 px-4 bg-purple-600 hover:bg-purple-700 transition-all rounded-lg text-white text-sm font-medium">
                    Create New Simulation
                  </button>
                </motion.div>
              )}
            </motion.div>
            
            {/* Pagination */}
            {sortedProfiles.length > 0 && (
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    &lt;
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border-0 text-white bg-purple-600">
                    1
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    2
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    3
                  </button>
                  <span className="text-gray-400">...</span>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    10
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    &gt;
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer Banner */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-purple-900/90 backdrop-blur-md py-4 z-20 border-t border-purple-700/30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h4 className="text-white font-medium">Create a new financial simulation</h4>
            <p className="text-purple-200/70 text-sm">
              Start building your next financial scenario with AI assistance
            </p>
          </div>
          <motion.button 
            className="py-2 px-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Simulation
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default History;