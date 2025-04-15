import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter, X } from 'lucide-react';

const FilterBar = ({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  selectedDate,
  setSelectedDate
}) => {
  const statuses = [
    { value: 'all', label: 'All' },
    { value: 'Extreme Fear', label: 'Extreme Fear' },
    { value: 'Fear', label: 'Fear' },
    { value: 'Neutral', label: 'Neutral' },
    { value: 'Greed', label: 'Greed' },
    { value: 'Extreme Greed', label: 'Extreme Greed' }
  ];

  const clearFilters = () => {
    setSearch('');
    setFilterStatus('all');
    setSelectedDate('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl px-6 py-5 mb-8 border border-white/10"
    >
      <div className="flex flex-col gap-6">
        {/* Search and Calendar Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400/80" />
            <input
              type="text"
              placeholder="Search simulations by name or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white/5 text-white/90 text-sm rounded-lg border border-white/10 focus:border-purple-500/50 focus:ring-2 ring-purple-500/20 focus:outline-none transition-all duration-200"
            />
            {search && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSearch('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="items-center gap-3 hidden md:flex ">
            <div className="relative w-full md:w-auto">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Calendar className="h-5 w-5 text-purple-400/80" />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full md:w-44 pl-10 pr-4 py-3 bg-white/5 text-white/90 text-sm rounded-lg border border-white/10 focus:border-purple-500/50 focus:ring-2 ring-purple-500/20 focus:outline-none transition-all duration-200"
              />
            </div>

            {(search || selectedDate || filterStatus !== 'all') && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 text-sm transition-colors flex items-center"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Status Bar */}
        <div className="relative hidden md:block">
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-purple-400/80">
            <Filter className="h-4 w-4" />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto py-1 pl-6 pr-2 scrollbar-none">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${filterStatus === status.value 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/20' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10'}
                `}
              >
                {filterStatus === status.value && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
