import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, User, LogOut, Bell, Settings, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';

const Header = ({ scrollY }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header 
      className={`
        w-full z-50 fixed top-0 transition-all duration-300 
        ${scrollY > 20 
          ? 'bg-black/40 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-900/10' 
          : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-800/30">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="ml-3">
              <span className="text-white text-xl font-bold">
                Fin<span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">Sage.ai</span>
              </span>
              <span className="block text-xs text-purple-300/70">Simulation History</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.a 
              href="/"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              Dashboard
            </motion.a>
            <motion.a 
              href="/"
              className="text-white text-sm font-medium transition-colors relative"
              whileHover={{ y: -2 }}
            >
              Simulations
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                layoutId="navIndicator"
              />
            </motion.a>
            <motion.a 
              href="/"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              Analytics
            </motion.a>
            <motion.a 
              href="/"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              Education
            </motion.a>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-purple-500" />
          </motion.button>
          
          {/* Settings */}
          <motion.button
            className="hidden md:flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="h-5 w-5" />
          </motion.button>

          {/* User Profile */}
          <motion.div
            className="hidden md:flex items-center gap-2 glass-card px-3 py-2 rounded-full cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-8 w-8 rounded-full overflow-hidden border border-purple-500/30">
              <img 
                src="https://randomuser.me/api/portraits/men/44.jpg" 
                alt="User Avatar" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-white/90">John Doe</span>
          </motion.div>

          {/* Logout */}
          <motion.button
            className="hidden md:flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
          >
            <LogOut className="h-5 w-5" />
          </motion.button>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full bg-white/5 border border-purple-500/20 text-purple-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          className="md:hidden bg-black/90 backdrop-blur-xl p-4 border-t border-purple-500/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <nav className="flex flex-col space-y-3 pb-3 border-b border-purple-500/10">
            <a href="/" className="text-white/80 py-2 text-sm font-medium">Dashboard</a>
            <a href="/" className="text-white py-2 text-sm font-medium">Simulations</a>
            <a href="/" className="text-white/80 py-2 text-sm font-medium">Analytics</a>
            <a href="/" className="text-white/80 py-2 text-sm font-medium">Education</a>
          </nav>
          
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-purple-500/30">
                <img 
                  src="https://randomuser.me/api/portraits/men/44.jpg" 
                  alt="User Avatar" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-white/90">John Doe</span>
            </div>
            
            <button 
              className="p-2 rounded-full bg-white/5 border border-purple-500/20 text-purple-300"
              onClick={() => navigate('/login')}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
