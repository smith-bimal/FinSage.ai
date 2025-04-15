import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Bell, Settings, Menu, User, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import logoImg from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  const auth = useAuth();
  const user = auth?.user;

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === '/dashboard' && (location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/'))) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
    } else {
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
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex items-center z-50">
              <motion.div className="relative">
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

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8 mr-auto ml-16">
              <div
                className={`${isActive('/dashboard') ? 'text-white' : 'text-white/70'} text-sm font-medium`}
              >
                Dashboard
              </div>
              <div
                className={`${isActive('/new-simulation') ? 'text-white' : 'text-white/70'} text-sm font-medium cursor-pointer`}
                onClick={() => navigate('/new-simulation')}
              >
                Simulation
              </div>
              <div
                className={`${isActive('/history') ? 'text-white' : 'text-white/70'} text-sm font-medium cursor-pointer`}
                onClick={() => navigate('/history')}
              >
                History
              </div>
            </div>
          )}

          {/* Right side controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {!isMobile ? (
              <>
                <motion.button
                  className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-purple-500" />
                </motion.button>
                <motion.button
                  className="hidden md:flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-5 w-5" />
                </motion.button>
                <motion.div
                  className="hidden md:flex items-center gap-2 glass-card px-3 py-2 rounded-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <User className="h-4 w-4 text-purple-300" />
                  <span className="text-sm font-medium text-white/90">
                    {user?.name || user?.email || "User"}
                  </span>
                </motion.div>
                <motion.button
                  className="hidden md:flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </>
            ) : (
              // Always show menu button on mobile
              <motion.button
                className="p-2 rounded-full bg-white/5 border border-purple-500/20 text-purple-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ display: 'block' }}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            )}
          </div>
        </div>
        {/* Move AnimatePresence for mobile menu here, outside the flex container */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex items-center justify-center"
              style={{ top: 0, left: 0, width: '100vw', height: '100vh', position: 'fixed' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.nav className="flex flex-col items-center space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <button
                    className={`text-2xl font-semibold transition-colors ${isActive('/dashboard') ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
                  >
                    Dashboard
                  </button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.10 }}
                >
                  <button
                    className={`text-2xl font-semibold transition-colors ${isActive('/new-simulation') ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
                  >
                    Simulation
                  </button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <button
                    className={`text-2xl font-semibold transition-colors ${isActive('/history') ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
                  >
                    History
                  </button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.20 }}
                  className="pt-6 flex flex-col space-y-4 w-full items-center"
                >
                  <button
                    className="flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-colors duration-200 px-6 py-2 gap-2"
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-2 pt-4"
                >
                  <User className="h-4 w-4 text-purple-300" />
                  <span className="text-lg font-medium text-white/90">
                    {user?.name || user?.email || "User"}
                  </span>
                </motion.div>
              </motion.nav>
              {/* Close button in top right */}
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-8 w-8" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Add spacer div to push content below the fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
