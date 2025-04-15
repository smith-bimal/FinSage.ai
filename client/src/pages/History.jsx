/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/history.css';
import {
  ArrowRight,
  Search,
  Loader
} from 'lucide-react';

// Import components
import Header from '../components/Header';
import api from '../config/axios.config.js';

// Import new history components
import AnimatedBackground from '../components/history/AnimatedBackground';
import AdvancedFilters from '../components/history/AdvancedFilters';
import ExportPanel from '../components/history/ExportPanel';
import MobileFilterModal from '../components/history/MobileFilterModal';
import Pagination from '../components/history/Pagination';
import DeleteConfirmationModal from '../components/history/DeleteConfirmationModal';
import EmptyState from '../components/history/EmptyState';
import LoadingState from '../components/history/LoadingState';
import ProfileCard from '../components/history/ProfileCard.jsx';
import FilterBar from '../components/history/FilterBar.jsx';

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
  const [itemsPerPage] = useState(5); // Changed from 10 to 5
  const navigate = useNavigate();

  // Add advanced filter states
  const [predictionFilter, setPredictionFilter] = useState('all');
  const [accuracyRange, setAccuracyRange] = useState(75);
  const [tempFilters, setTempFilters] = useState({
    sortOrder: 'newest',
    prediction: 'all',
    accuracyRange: 75,
    minRevenue: '',
    maxRevenue: '',
    filterStatus: 'all',
    selectedDate: ''
  });

  // Add states for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [simulationToDelete, setSimulationToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Add a state to control advanced filter modal on mobile
  const [showMobileAdvanced, setShowMobileAdvanced] = useState(false);

  // Advanced filter: auto-apply on change (no Apply/Reset buttons)
  useEffect(() => {
    setSortOrder(tempFilters.sortOrder);
    setPredictionFilter(tempFilters.prediction);
    setAccuracyRange(tempFilters.accuracyRange);
    setFilterStatus(tempFilters.filterStatus || 'all');
    setSelectedDate(tempFilters.selectedDate || '');
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [
    tempFilters.sortOrder,
    tempFilters.prediction,
    tempFilters.accuracyRange,
    tempFilters.filterStatus,
    tempFilters.selectedDate,
    tempFilters.minRevenue,
    tempFilters.maxRevenue
  ]);

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

          // Map confidence score to new sentiment labels for status
          let marketSentiment = "Neutral";
          let prediction = "Neutral";
          if (item.recommendations && item.recommendations.length > 0) {
            const avgConfidence = item.recommendations.reduce((sum, rec) => sum + rec.confidenceScore, 0) / item.recommendations.length;
            // Status: Extreme Fear, Fear, Neutral, Greed, Extreme Greed
            if (avgConfidence <= 20) {
              marketSentiment = "Extreme Fear";
            } else if (avgConfidence > 20 && avgConfidence <= 40) {
              marketSentiment = "Fear";
            } else if (avgConfidence > 40 && avgConfidence <= 60) {
              marketSentiment = "Neutral";
            } else if (avgConfidence > 60 && avgConfidence <= 80) {
              marketSentiment = "Greed";
            } else if (avgConfidence > 80) {
              marketSentiment = "Extreme Greed";
            }
            // Prediction: Bullish, Bearish, Neutral
            if (avgConfidence > 60) {
              prediction = "Bullish";
            } else if (avgConfidence < 40) {
              prediction = "Bearish";
            } else {
              prediction = "Neutral";
            }
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
            prediction: prediction,
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

  // Filter profiles based on search, status, date, prediction, accuracy, and revenue range
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

    // Revenue range filter
    const revenueNum = parseFloat(profile.totalRevenue.replace(/[^0-9.-]+/g, ""));
    const minRev = tempFilters.minRevenue !== '' ? parseFloat(tempFilters.minRevenue) : null;
    const maxRev = tempFilters.maxRevenue !== '' ? parseFloat(tempFilters.maxRevenue) : null;
    const matchesMinRevenue = minRev !== null ? revenueNum >= minRev : true;
    const matchesMaxRevenue = maxRev !== null ? revenueNum <= maxRev : true;

    // Date filter
    const matchesAdvDate = tempFilters.selectedDate
      ? new Date(profile.date).toISOString().split('T')[0] === tempFilters.selectedDate
      : true;

    // Status filter (advanced)
    const matchesAdvStatus = tempFilters.filterStatus && tempFilters.filterStatus !== 'all'
      ? profile.status === tempFilters.filterStatus
      : true;

    // Prediction filter (advanced)
    const matchesAdvPrediction = tempFilters.prediction && tempFilters.prediction !== 'all'
      ? profile.prediction.toLowerCase() === tempFilters.prediction.toLowerCase()
      : true;

    // Accuracy filter (advanced)
    const matchesAdvAccuracy = profileAccuracy >= (tempFilters.accuracyRange || 0);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDate &&
      matchesPrediction &&
      matchesAccuracy &&
      matchesMinRevenue &&
      matchesMaxRevenue &&
      matchesAdvDate &&
      matchesAdvStatus &&
      matchesAdvPrediction &&
      matchesAdvAccuracy
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Sorting logic: always use tempFilters.sortOrder for sorting
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (tempFilters.sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (tempFilters.sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (tempFilters.sortOrder === 'highest-revenue') {
      return parseFloat(b.totalRevenue.replace('$', '').replace(/,/g, '')) -
        parseFloat(a.totalRevenue.replace('$', '').replace(/,/g, ''));
    } else if (tempFilters.sortOrder === 'lowest-revenue') {
      return parseFloat(a.totalRevenue.replace('$', '').replace(/,/g, '')) -
        parseFloat(b.totalRevenue.replace('$', '').replace(/,/g, ''));
    } else {
      return 0;
    }
  });

  const currentItems = sortedProfiles.slice(indexOfFirstItem, indexOfLastItem);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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

  const handleReloadPage = () => {
    navigate(0); // Using navigate(0) is equivalent to window.location.reload()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#13071F] to-black overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto pt-6 px-6">
        <Header title="Simulation History" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* LEFT COLUMN: Advanced Filters (desktop only) */}
          <motion.div
            className="lg:col-span-3 flex-col space-y-6 hidden lg:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AdvancedFilters tempFilters={tempFilters} setTempFilters={setTempFilters} />
            <ExportPanel />
          </motion.div>

          <div className="lg:col-span-9 mb-40 md:mb-16">
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

              <div className="block lg:hidden">
                <span
                  className="flex items-center gap-2 text-purple-400 hover:text-white cursor-pointer mt-2 mb-2 text-sm font-medium"
                  onClick={() => setShowMobileAdvanced(true)}
                >
                  <Search className="h-4 w-4" />
                  Advanced Filters
                </span>
              </div>
            </div>

            {loading ? (
              <LoadingState />
            ) : error ? (
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6 text-center">
                <p className="text-red-400 mb-2">{error}</p>
                <button
                  onClick={handleReloadPage}
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
                  <EmptyState />
                )}
              </motion.div>
            )}

            {!loading && !error && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
              />
            )}
            
            <div className="block lg:hidden mt-8">
              <ExportPanel />
            </div>
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
          <DeleteConfirmationModal 
            simulationToDelete={simulationToDelete}
            deleteLoading={deleteLoading}
            deleteError={deleteError}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        )}
      </AnimatePresence>

      {/* Mobile: Advanced Filter Modal */}
      <AnimatePresence>
        {showMobileAdvanced && (
          <MobileFilterModal 
            showMobileAdvanced={showMobileAdvanced}
            setShowMobileAdvanced={setShowMobileAdvanced}
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;