/* eslint-disable no-unused-vars */
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
  Search,
  Loader,
  Trash2, // Added Trash2 icon for delete button
  AlertCircle
} from 'lucide-react';

import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ProfileCard from '../components/ProfileCard';
import StatusBadge from '../components/StatusBadge';
import api from '../config/axios.config.js';

const History = () => {
  const [scrollY, setScrollY] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSimulations: 0,
    avgAccuracy: 0,
    currentMarket: 'Neutral',
    marketChange: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Add advanced filter states
  const [predictionFilter, setPredictionFilter] = useState('all');
  const [accuracyRange, setAccuracyRange] = useState(75);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    sortOrder: 'newest',
    prediction: 'all',
    accuracyRange: 75
  });

  // Add states for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [simulationToDelete, setSimulationToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch simulation history from backend
  useEffect(() => {
    const fetchSimulationHistory = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
          navigate('/login');
          return;
        }
        
        const { data } = await api.get(`/simulations/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Format the data to match our component requirements
        const formattedData = data.map(item => {
          const incomeData = item.chartData?.incomeVsExpenses?.find(i => i.label === "Income");
          const expensesData = item.chartData?.incomeVsExpenses?.find(i => i.label === "Expenses");
          
          const income = incomeData?.amount || 0;
          const expenses = expensesData?.amount || 0;
          const revenue = income - expenses;
          
          let marketSentiment = "Neutral";
          if (item.recommendations && item.recommendations.length > 0) {
            const avgConfidence = item.recommendations.reduce((sum, rec) => sum + rec.confidenceScore, 0) / item.recommendations.length;
            marketSentiment = avgConfidence > 80 ? "Bullish" : avgConfidence < 50 ? "Bearish" : "Neutral";
          }
          
          return {
            id: item._id,
            name: item.title || `Simulation ${new Date(item.createdAt).toLocaleDateString()}`,
            date: new Date(item.createdAt).toISOString().split('T')[0],
            thumbnail: item.thumbnail || "/images/default-thumbnail.png",
            totalRevenue: `$${revenue.toLocaleString()}`,
            income: `$${income.toLocaleString()}`,
            expenses: `$${expenses.toLocaleString()}`,
            status: marketSentiment,
            prediction: marketSentiment,
            accuracy: `${(item.recommendations?.[0]?.confidenceScore || 75)}%`
          };
        });
        
        setProfiles(formattedData);
        
        if (formattedData.length > 0) {
          const accuracies = formattedData.map(p => parseFloat(p.accuracy));
          const avgAccuracy = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
          
          setStats({
            totalSimulations: formattedData.length,
            avgAccuracy: avgAccuracy.toFixed(1),
            currentMarket: formattedData[0].status,
            marketChange: Math.random() > 0.5 ? 2.1 : -2.1
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching simulation history:', err);
        setError('Failed to load simulation history. Please try again.');
        setLoading(false);
      }
    };

    fetchSimulationHistory();
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter profiles based on search, status, date, prediction, and accuracy range
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : profile.status === filterStatus;
    const matchesDate = selectedDate 
      ? new Date(profile.date).toISOString().split('T')[0] === selectedDate
      : true;
    const matchesPrediction = predictionFilter === 'all' 
      ? true 
      : profile.prediction.toLowerCase() === predictionFilter.toLowerCase();
    const profileAccuracy = parseFloat(profile.accuracy.replace('%', ''));
    const matchesAccuracy = profileAccuracy >= accuracyRange;

    return matchesSearch && matchesStatus && matchesDate && matchesPrediction && matchesAccuracy;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === 'highest-revenue') {
      return parseFloat(b.totalRevenue.replace('$', '').replace(/,/g, '')) - 
             parseFloat(a.totalRevenue.replace('$', '').replace(/,/g, ''));
    } else {
      return parseFloat(a.totalRevenue.replace('$', '').replace(/,/g, '')) - 
             parseFloat(b.totalRevenue.replace('$', '').replace(/,/g, ''));
    }
  });

  const currentItems = sortedProfiles.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  const totalPages = Math.ceil(sortedProfiles.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Apply filters handler
  const handleApplyFilters = () => {
    setSortOrder(tempFilters.sortOrder);
    setPredictionFilter(tempFilters.prediction);
    setAccuracyRange(tempFilters.accuracyRange);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  // Reset filters handler
  const handleResetFilters = () => {
    setTempFilters({
      sortOrder: 'newest',
      prediction: 'all',
      accuracyRange: 75
    });
    setSortOrder('newest');
    setPredictionFilter('all');
    setAccuracyRange(75);
    setCurrentPage(1);
  };
  
  // Toggle advanced search
  const toggleAdvancedSearch = () => setShowAdvancedSearch(!showAdvancedSearch);

  // Handle delete simulation
  const handleDeleteClick = (e, simulationId) => {
    e.stopPropagation(); // Prevent navigation to simulation details
    const simulation = profiles.find(p => p.id === simulationId);
    setSimulationToDelete(simulation);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!simulationToDelete) return;
    
    try {
      setDeleteLoading(true);
      setDeleteError(null);
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      await api.delete(`/simulations/${simulationToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId } // Send userId in request body for additional verification
      });
      
      // Remove the deleted simulation from the list
      setProfiles(prevProfiles => 
        prevProfiles.filter(profile => profile.id !== simulationToDelete.id)
      );
      
      // Update statistics
      if (profiles.length > 0) {
        const updatedProfiles = profiles.filter(profile => profile.id !== simulationToDelete.id);
        const accuracies = updatedProfiles.map(p => parseFloat(p.accuracy));
        const avgAccuracy = accuracies.length > 0 ? 
          accuracies.reduce((a, b) => a + b, 0) / accuracies.length : 0;
        
        setStats(prev => ({
          ...prev,
          totalSimulations: updatedProfiles.length,
          avgAccuracy: avgAccuracy.toFixed(1)
        }));
      }
      
      // Close modal
      setShowDeleteModal(false);
      setSimulationToDelete(null);
    } catch (err) {
      console.error('Error deleting simulation:', err);
      setDeleteError('Failed to delete simulation. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSimulationToDelete(null);
    setDeleteError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#13071F] to-black overflow-hidden">
      <div className="fixed inset-0 -z-10">
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
        
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-br from-purple-800/20 to-transparent blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-blue-800/20 to-transparent blur-2xl"></div>
        </div>
        
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

      <div className="max-w-7xl mx-auto pt-6 px-6">
        <Header title="Simulation History" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <motion.div 
            className="lg:col-span-3 flex flex-col space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 relative overflow-hidden border border-gray-800/50 shadow-lg shadow-purple-900/10">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
              
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-blue-400" />
                Advanced Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Sort By</label>
                  <select 
                    value={tempFilters.sortOrder}
                    onChange={(e) => setTempFilters({...tempFilters, sortOrder: e.target.value})}
                    className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm text-white bg-[#06080F] focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                    <button 
                      className={`text-xs py-1.5 px-2 ${tempFilters.prediction === 'Bullish' 
                        ? 'bg-green-600/30 text-green-400 border-green-500/30' 
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'} 
                        rounded-lg border transition-colors`}
                      onClick={() => setTempFilters({
                        ...tempFilters, 
                        prediction: tempFilters.prediction === 'Bullish' ? 'all' : 'Bullish'
                      })}
                    >
                      Bullish
                    </button>
                    <button 
                      className={`text-xs py-1.5 px-2 ${tempFilters.prediction === 'Bearish' 
                        ? 'bg-red-600/30 text-red-400 border-red-500/30' 
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'} 
                        rounded-lg border transition-colors`}
                      onClick={() => setTempFilters({
                        ...tempFilters, 
                        prediction: tempFilters.prediction === 'Bearish' ? 'all' : 'Bearish'
                      })}
                    >
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
                      value={tempFilters.accuracyRange}
                      onChange={(e) => setTempFilters({...tempFilters, accuracyRange: parseInt(e.target.value)})}
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-white">{tempFilters.accuracyRange}%+</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 flex space-x-2">
                <button 
                  className="flex-1 text-center text-sm py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors rounded-lg text-white font-medium"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
                <button 
                  className="text-center text-sm py-2 px-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-gray-300 font-medium border border-white/10"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 relative overflow-hidden border border-gray-800/50 shadow-lg shadow-purple-900/10">
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
          
          <div className="lg:col-span-9">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <p className="text-gray-400">
                Review your previous financial simulations and track performance over time
              </p>
            </motion.div>

            <FilterBar 
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <div className="text-sm text-gray-400 flex items-center justify-between mb-4">
              <span>
                {sortedProfiles.length} {sortedProfiles.length === 1 ? 'result' : 'results'} found
                {sortedProfiles.length > itemsPerPage && ` (showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, sortedProfiles.length)})`}
              </span>
              <button 
                className="text-xs flex items-center text-purple-400 hover:text-white transition-colors"
                onClick={toggleAdvancedSearch}
              >
                <Search className="h-3 w-3 mr-1" />
                {showAdvancedSearch ? 'Hide Advanced Search' : 'Advanced Search'}
              </button>
            </div>

            <AnimatePresence>
              {showAdvancedSearch && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/40 backdrop-blur-md rounded-lg border border-gray-800/50 overflow-hidden mb-6"
                >
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-white mb-3">Advanced Search Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Revenue Range</label>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            placeholder="Min" 
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                          <span className="text-gray-500">-</span>
                          <input 
                            type="text" 
                            placeholder="Max" 
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Date Created</label>
                        <input 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Market Sentiment</label>
                        <select 
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="all">All</option>
                          <option value="Bullish">Bullish</option>
                          <option value="Neutral">Neutral</option>
                          <option value="Bearish">Bearish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-10 w-10 text-purple-500 animate-spin mb-4" />
                <p className="text-gray-400">Loading simulation history...</p>
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6 text-center">
                <p className="text-red-400 mb-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-sm py-1.5 px-4 bg-red-600/30 hover:bg-red-600/50 rounded text-white"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <motion.div 
                className="space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {currentItems.length > 0 ? (
                  currentItems.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      {...profile}
                      onClick={() => navigate(`/dashboard/${profile.id}`)}
                      onDelete={(e) => handleDeleteClick(e, profile.id)}
                    />
                  ))
                ) : (
                  <motion.div 
                    className="bg-gray-900/30 backdrop-blur-md text-center p-10 rounded-xl border border-gray-800/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-lg font-medium text-white mb-2">No simulations found</h3>
                    <p className="text-gray-400 mb-4">
                      Try adjusting your filters or creating a new simulation.
                    </p>
                    <button 
                      onClick={() => navigate('/new-simulation')}
                      className="py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all rounded-lg text-white text-sm font-medium"
                    >
                      Create New Simulation
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {!loading && !error && sortedProfiles.length > itemsPerPage && (
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <button 
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-400 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'} transition-colors`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  
                  {pageNumbers.length <= 5 ? (
                    pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                          currentPage === number 
                            ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600' 
                            : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                        } transition-colors`}
                      >
                        {number}
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        onClick={() => paginate(1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                          currentPage === 1 
                            ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600' 
                            : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                        } transition-colors`}
                      >
                        1
                      </button>
                      
                      {currentPage > 3 && <span className="text-gray-400">...</span>}
                      
                      {pageNumbers
                        .filter(number => number !== 1 && number !== totalPages && 
                                 (Math.abs(number - currentPage) < 2 || 
                                  (number === 2 && currentPage === 1) || 
                                  (number === totalPages - 1 && currentPage === totalPages)))
                        .map(number => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                              currentPage === number 
                                ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600' 
                                : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                            } transition-colors`}
                          >
                            {number}
                          </button>
                        ))}
                      
                      {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}
                      
                      <button
                        onClick={() => paginate(totalPages)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                          currentPage === totalPages 
                            ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600' 
                            : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                        } transition-colors`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  
                  <button 
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-400 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'} transition-colors`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/90 via-purple-900/80 to-black/90 backdrop-blur-md py-4 z-20 border-t border-gray-800/30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h4 className="text-white font-medium">Create a new financial simulation</h4>
            <p className="text-gray-400 text-sm">
              Start building your next financial scenario with AI assistance
            </p>
          </div>
          <motion.button 
            className="py-2 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/new-simulation')}
          >
            Create Simulation
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center mb-4">
                <AlertCircle className="text-red-500 mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold text-white">Confirm Deletion</h3>
              </div>
              
              <p className="text-gray-300 mb-2">
                Are you sure you want to delete the following simulation?
              </p>
              
              {simulationToDelete && (
                <div className="bg-gray-800/50 p-3 rounded-lg mb-4 border border-gray-700">
                  <p className="text-white font-medium">{simulationToDelete.name}</p>
                  <p className="text-gray-400 text-sm">Created on: {new Date(simulationToDelete.date).toLocaleDateString()}</p>
                </div>
              )}
              
              <p className="text-red-400 text-sm mb-6">
                This action will permanently delete the simulation and all associated financial data. This cannot be undone.
              </p>
              
              {deleteError && (
                <div className="bg-red-900/30 border border-red-700/30 text-red-400 p-3 rounded-lg mb-4">
                  {deleteError}
                </div>
              )}
              
              <div className="flex space-x-3 justify-end">
                <button
                  onClick={cancelDelete}
                  disabled={deleteLoading}
                  className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors flex items-center"
                >
                  {deleteLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Permanently
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;