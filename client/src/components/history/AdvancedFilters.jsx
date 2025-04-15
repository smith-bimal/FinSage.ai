import { motion } from 'framer-motion';
import { Filter, DownloadCloud } from 'lucide-react';

const AdvancedFilters = ({ tempFilters, setTempFilters }) => {
  return (
    <div className="">
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
              onChange={(e) => setTempFilters({ ...tempFilters, sortOrder: e.target.value })}
              className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm text-white bg-[#06080F] focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest-revenue">Highest Revenue</option>
              <option value="lowest-revenue">Lowest Revenue</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-2 block font-medium">Revenue Range ($)</label>
            <div className="flex flex-row items-center gap-2">
              <input
                type="number"
                min="0"
                value={tempFilters.minRevenue}
                onChange={e => setTempFilters({ ...tempFilters, minRevenue: e.target.value })}
                placeholder="Min"
                className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                min="0"
                value={tempFilters.maxRevenue}
                onChange={e => setTempFilters({ ...tempFilters, maxRevenue: e.target.value })}
                placeholder="Max"
                className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-2 block font-medium">Date Created</label>
            <input
              type="date"
              value={tempFilters.selectedDate || ''}
              onChange={(e) => setTempFilters({ ...tempFilters, selectedDate: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-2 block font-medium">Market Sentiment</label>
            <select
              value={tempFilters.filterStatus || 'all'}
              onChange={(e) => setTempFilters({ ...tempFilters, filterStatus: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option className='bg-[#06080F]' value="all">All</option>
              <option className='bg-[#06080F]' value="Extreme Fear">Extreme Fear</option>
              <option className='bg-[#06080F]' value="Fear">Fear</option>
              <option className='bg-[#06080F]' value="Neutral">Neutral</option>
              <option className='bg-[#06080F]' value="Greed">Greed</option>
              <option className='bg-[#06080F]' value="Extreme Greed">Extreme Greed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-2 block font-medium">Prediction</label>
            <div className="flex gap-2">
              <button
                className={`flex-1 text-xs py-1.5 px-2 ${tempFilters.prediction === 'Bullish'
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
                className={`flex-1 text-xs py-1.5 px-2 ${tempFilters.prediction === 'Bearish'
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
              <button
                className={`flex-1 text-xs py-1.5 px-2 ${tempFilters.prediction === 'Neutral'
                  ? 'bg-yellow-600/30 text-yellow-400 border-yellow-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'} 
                  rounded-lg border transition-colors`}
                onClick={() => setTempFilters({
                  ...tempFilters,
                  prediction: tempFilters.prediction === 'Neutral' ? 'all' : 'Neutral'
                })}
              >
                Neutral
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-2 block font-medium">Accuracy Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={tempFilters.accuracyRange}
                onChange={(e) => setTempFilters({ ...tempFilters, accuracyRange: parseInt(e.target.value) })}
                className="w-full accent-purple-500"
              />
              <span className="text-xs text-white">{tempFilters.accuracyRange}%+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
