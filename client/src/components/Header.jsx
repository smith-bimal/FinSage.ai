import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell, Settings, Menu, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import logoImg from '../assets/logo.png'; // Import logo image for proper loading
import { useAuth } from '../contexts/AuthContext'; // Make sure path is correct

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  
  // Add null check when using useAuth
  const auth = useAuth();
  // Use optional chaining to safely access user property
  const user = auth?.user;
  
  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/dashboard' && (location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/'))) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Safely call logout if it exists
    if (auth?.logout) {
      auth.logout();
    } else {
      // Fallback to original method if auth context is not available
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
    navigate('/login');
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 
          ${scrollY > 20
            ? 'bg-black/40 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-900/10'
            : 'bg-transparent'}
        `}
      >
        <div className="w-full max-w-[2000px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center z-50">
              <motion.div
                className="relative"
              >
                <img src={logoImg} alt="FinSage.ai Logo" className="w-12 h-12" />

                <motion.div
                  className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-indigo-400"
                  animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
              </motion.div>
              <div className="ml-3">
                <span className="text-white text-xl font-extrabold">
                  Fin<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Sage.ai</span>
                </span>
                <span className="block text-xs text-gray-400">{title}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8 mr-auto ml-16">
            <div
              className={`${isActive('/dashboard') ? 'text-white' : 'text-white/70'} text-sm font-medium`}
            >
              Dashboard
            </div>
            <div
              className={`${isActive('/new-simulation') ? 'text-white' : 'text-white/70'} text-sm font-medium`}
            >
              Simulation
            </div>
            <div
              className={`${isActive('/history') ? 'text-white' : 'text-white/70'} text-sm font-medium`}
            >
              History
            </div>
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
              className="hidden md:flex items-center gap-2 glass-card px-3 py-2 rounded-full"
              whileHover={{ scale: 1.02 }}
            >
              <User className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium text-white/90">
                {user?.name || user?.email || "User"}
              </span>
            </motion.div>

            {/* Logout */}
            <motion.button
              className="hidden md:flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
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
              <div
                className={`${isActive('/dashboard') ? 'text-white' : 'text-white/80'} py-2 text-sm font-medium`}
              >
                Dashboard
              </div>
              <div
                className={`${isActive('/simulation') ? 'text-white' : 'text-white/80'} py-2 text-sm font-medium`}
              >
                Simulation
              </div>
              <div
                className={`${isActive('/history') ? 'text-white' : 'text-white/80'} py-2 text-sm font-medium`}
              >
                History
              </div>
            </nav>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-purple-300" />
                <span className="text-sm font-medium text-white/90">
                  {user?.name || user?.email || "User"}
                </span>
              </div>

              <button
                className="p-2 rounded-full bg-white/5 border border-purple-500/20 text-purple-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </header>
      {/* Add spacer div to push content below the fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
