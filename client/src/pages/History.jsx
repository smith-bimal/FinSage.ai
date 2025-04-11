import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Calendar,
  SortAsc,
  SortDesc,
  Search,
  User,
  LogOut,
  Bell,
  Download
} from "lucide-react";

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
    statusColor: "text-red-500",
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
    statusColor: "text-orange-500",
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
    statusColor: "text-yellow-500",
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
    statusColor: "text-green-400",
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
    statusColor: "text-green-600",
    prediction: "Bullish",
    accuracy: "95%"
  }
];

const History = () => {
  const [scrollY, setScrollY] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated filter function
  const filteredProfiles = profiles.filter(profile => {
    // Search filter
    const matchesSearch = profile.name.toLowerCase().includes(search.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === "all" ? true : profile.status === filterStatus;
    
    // Date filter
    const matchesDate = selectedDate 
      ? new Date(profile.date).toISOString().split('T')[0] === selectedDate
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white"
    >
      {/* Header */}
      <header className={`w-full z-50 fixed top-0 transition-all duration-300 ${scrollY > 20 ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-purple-900/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                
                <div className="h-11 w-11 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <motion.div
                  className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-blue-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="ml-3">
                <span className="text-white text-xl font-extrabold">
                  Fin<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Sage.ai</span>
                </span>
                <span className="block text-xs text-gray-400">History</span>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-6">
            <motion.div
              className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <User className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">John Doe</span>
            </motion.div>

            <motion.button
              className="flex items-center space-x-2 text-gray-400 hover:text-white"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/login')}
            >
              <LogOut className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      
      <div className="max-w-7xl mx-auto pt-24 px-6">
        {/* Controls Section */}
        <h2 className="text-xl font-semibold mb-4">Welcome back! Here's your Simulations history:</h2>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 mb-8 border border-white/10">
          <div className="flex flex-col space-y-6">
            {/* Search and Calendar */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search profiles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 text-gray-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/50 border border-white/10"
                />
              </div>
            </div>

            {/* Status Grid */}
            <div className="flex items-center justify-between mt-4">
              {/* Sort and Filter Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filterStatus === "all" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
                  }`}
                  onClick={() => setFilterStatus("all")}
                >
                  All Tickets
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filterStatus === "Extreme Fear" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
                  }`}
                  onClick={() => setFilterStatus("Extreme Fear")}
                >
                  Extreme Fear
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filterStatus === "Fear" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
                  }`}
                  onClick={() => setFilterStatus("Fear")}
                >
                  Fear
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filterStatus === "Neutral" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
                  }`}
                  onClick={() => setFilterStatus("Neutral")}
                >
                  Neutral
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filterStatus === "Greed" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
                  }`}
                  onClick={() => setFilterStatus("Greed")}
                >
                  Greed
                </button>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm font-medium border border-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile List */}
        <div className="space-y-4">
        {filteredProfiles.map((profile) => (
            <motion.div
  key={profile.id}
  className="relative group p-6 bg-white/5 rounded-2xl border border-purple-800/20 hover:border-purple-500 shadow-lg backdrop-blur-md hover:shadow-purple-600/20 transition-all duration-300 overflow-hidden"
  whileHover={{ scale: 1.015 }}
  whileTap={{ scale: 0.985 }}
  onClick={() => navigate(`/dashboard/${profile.id}`)}
>
  {/* Animated glow ring */}
  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 blur-2xl animate-pulse rounded-2xl" />
  </div>

  {/* Profile Info */}
  <div className="flex items-start space-x-4 z-10 relative">
    <img
      src={profile.thumbnail}
      alt={profile.name}
      className="w-16 h-16 rounded-lg object-cover border border-white/10 shadow-sm"
    />

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{profile.name}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${profile.statusColor} bg-white/10`}>
          {profile.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 text-sm mt-2 text-gray-300">
        <p><span className="text-purple-400">Revenue:</span> {profile.totalRevenue}</p>
        <p><span className="text-purple-400">Income:</span> {profile.income}</p>
        <p><span className="text-purple-400">Expenses:</span> {profile.expenses}</p>
        <p><span className="text-purple-400">Prediction:</span> {profile.prediction}</p>
        <p><span className="text-purple-400">Accuracy:</span> {profile.accuracy}</p>
        <p><span className="text-purple-400">Date:</span> {profile.date}</p>
      </div>
    </div>
  </div>

  {/* View CTA */}
  <div className="mt-4 flex justify-end">
    <motion.span
      className="text-sm text-purple-400 group-hover:text-white transition-colors font-medium"
      whileHover={{ scale: 1.1 }}
    >
      View →
    </motion.span>
  </div>
</motion.div>
))}
        </div>
      </div>
    </motion.div>
  );
};

export default History;