/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Mail,
  Cpu,
  ChevronRight,
  BarChart,
  Shield,
  ArrowRight,
  Check,
  Star,
  Activity,
  TrendingUp,
  DollarSign,
  Users,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import ChatBot from "../pages/ChatBot.jsx";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      const sections = ["home", "features", "howItWorks", "recommendations", "testimonials"];
      const sectionElements = sections.map(id => document.getElementById(id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop - 100 <= window.scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  // Smooth scroll function modified to use navigate for page changes
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    } else if (sectionId.startsWith('/')) {
      // If it's a path rather than an ID, navigate to that path
      navigate(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Financial company logos
  const financeCompanies = [
    { name: "JPMorgan Chase", logo: "https://logos-world.net/wp-content/uploads/2021/02/JP-Morgan-Chase-Logo.png" },
    { name: "Goldman Sachs", logo: "https://1000logos.net/wp-content/uploads/2016/12/Goldman-Sachs-Logo.png" },
    { name: "Morgan Stanley", logo: "https://cdn.freelogovectors.net/wp-content/uploads/2024/03/morgan_stanley_logo-freelogovectors.net_.png" },
    { name: "Visa", logo: "https://pngimg.com/d/visa_PNG4.png" },
    { name: "Mastercard", logo: "https://static-00.iconduck.com/assets.00/mastercard-icon-1024x793-xinze39n.png" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="overflow-hidden"
    >
      <div
        id="home"
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-400 opacity-20"
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 - 50 + "%",
                scale: Math.random() * 0.4 + 0.1,
              }}
              animate={{
                x: [
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%"
                ],
                y: [
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%"
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 20 + 10,
                ease: "linear"
              }}
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                filter: "blur(40px)"
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        {/* Header Section */}
        <header className={`w-full z-50 fixed top-0 transition-all duration-300 ${scrollY > 20 ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-purple-900/10' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center z-50">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="logo.png" alt="" className="w-12 h-12" />

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
                <span className="block text-xs text-gray-400">Financial Intelligence</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden z-50 text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation - Desktop */}
            <motion.nav
              className="hidden md:flex items-center bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 shadow-lg shadow-purple-900/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { name: "Home", id: "home" },
                { name: "Features", id: "features" },
                { name: "Works", id: "howItWorks" },
                { name: "Recommends", id: "recommendations" },
                { name: "Reviews", id: "testimonials" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all group ${activeSection === item.id ? 'text-white' : ''}`}
                >
                  <span>{item.name}</span>
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-transform origin-center ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </button>
              ))}
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex items-center justify-center"
                  style={{ top: 0, left: 0, width: '100vw', height: '100vh', position: 'fixed' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.nav className="flex flex-col items-center space-y-6">
                    {[
                      { name: "Home", id: "home" },
                      { name: "Features", id: "features" },
                      { name: "Works", id: "howItWorks" },
                      { name: "Recommends", id: "recommendations" },
                      { name: "Reviews", id: "testimonials" }
                    ].map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`text-2xl font-semibold transition-colors ${activeSection === item.id ? 'text-blue-400' : 'text-white hover:text-blue-400'
                            }`}
                        >
                          {item.name}
                        </button>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-6 flex flex-col space-y-4 w-full items-center"
                    >
                      <Link to="/login" className="w-full">
                        <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold">
                          Login
                        </button>
                      </Link>
                      <Link to="/login" state={{ signup: true }} className="w-full">
                        <button className="w-full py-3 px-6 bg-transparent border border-gray-600 rounded-lg text-gray-300">
                          Register
                        </button>
                      </Link>
                    </motion.div>
                  </motion.nav>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <motion.button
                  className="group py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all shadow-lg shadow-blue-700/20"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Login <ChevronRight className="inline-block h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/login" state={{ signup: true }}>
                <motion.button
                  className="py-2 px-4 bg-transparent border border-gray-600 hover:border-blue-500 rounded-lg text-gray-300 hover:text-white font-semibold transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative z-10 text-center max-w-5xl px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Powered by advanced AI
            </motion.span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Intelligent Financial Planning
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              FinSage.ai combines artificial intelligence with financial expertise to help you make smarter decisions, predict outcomes, and secure your financial future.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <Link to="/login">
                <motion.button
                  className="relative group w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </motion.button>
              </Link>
              <motion.button
                className="w-full sm:w-auto py-3 px-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-gray-300 font-semibold transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                See Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Trusted Companies with Finance-related Logos */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-gray-400 mb-6">Trusted by leading financial institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {financeCompanies.map((company) => (
                <motion.div
                  key={company.name}
                  className={`hover:opacity-100 grayscale opacity-35 hover:grayscale-0 transition-all ${company.name === "JPMorgan Chase" || company.name === "Goldman Sachs" ? "invert" : ""}`}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={company.logo} alt={company.name} className="h-12 object-contain" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Scroll Indicator */}
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => scrollToSection('features')}
          >
            <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center cursor-pointer">
              <motion.div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gradient-to-b from-black via-[#2f063f] to-black py-24">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm mb-4">
              OUR FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              AI-Powered Financial Intelligence
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Unlock the power of artificial intelligence to transform your financial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Smart Analytics",
                description: "Our AI analyzes your spending patterns and provides personalized insights to optimize your financial habits.",
                icon: <BarChart className="h-6 w-6 text-white" />,
                gradient: "from-purple-500 to-blue-600"
              },
              {
                title: "Predictive Scenarios",
                description: "Simulate real-life financial decisions and visualize their future impact with our advanced prediction models.",
                icon: <Cpu className="h-6 w-6 text-white" />,
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                title: "Privacy First",
                description: "End-to-end encryption and advanced security measures ensure your financial data remains secure and private.",
                icon: <Shield className="h-6 w-6 text-white" />,
                gradient: "from-cyan-500 to-blue-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 bg-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl shadow-purple-900/10 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className={`p-3 bg-gradient-to-br ${feature.gradient} rounded-lg inline-block mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mt-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Financial Forecasting Section with Image */}
          <motion.div
            className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-800/30 shadow-2xl shadow-blue-900/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Financial Forecasting
                </h3>
                <p className="text-gray-300 mb-6">
                  Our advanced AI algorithms analyze thousands of data points to provide you with accurate forecasts about your financial future.
                </p>
                <ul className="space-y-3">
                  {['Personalized financial roadmaps', 'Expense optimization suggestions', 'Investment opportunity alerts', 'Risk assessment analysis'].map((item) => (
                    <motion.li
                      key={item}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-2">
                        <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 flex items-center justify-center">
                <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Abstract glowing background */}
                  <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20"></div>

                  {/* Financial chart image */}
                  <div className="relative overflow-hidden rounded-lg border border-gray-700/50">
                    <img
                      src="https://img.freepik.com/premium-photo/financial-chart-graph-with-blue-purple-line-background_832479-2194.jpg?w=996"
                      alt="Financial Forecast Dashboard"
                      className="w-full rounded-lg shadow-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Chart overlay elements */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">Portfolio Growth</div>
                          <div className="text-xl font-bold text-green-400">+24.8%</div>
                        </div>
                        <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                          <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-xs text-white">Bullish trend</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div id="howItWorks" className="bg-black py-24 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px] opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-400 text-sm mb-4">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Simplify Your Financial Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI-powered process makes financial planning accessible and effective
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 relative">
            {/* Connecting line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent hidden md:block"></div>

            {[
              {
                title: "Connect Your Accounts",
                description: "Securely link your financial accounts for a comprehensive overview of your finances.",
                icon: <Users className="h-6 w-6 text-white" />,
                accentColor: "blue"
              },
              {
                title: "AI Analysis",
                description: "Our algorithms analyze your spending patterns, income sources, and financial goals.",
                icon: <Activity className="h-6 w-6 text-white" />,
                accentColor: "purple"
              },
              {
                title: "Personalized Strategy",
                description: "Receive tailored financial strategies and recommendations designed for your unique situation.",
                icon: <DollarSign className="h-6 w-6 text-white" />,
                accentColor: "cyan"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`relative w-16 h-16 rounded-full bg-${step.accentColor}-900/30 border border-${step.accentColor}-500/50 flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`absolute inset-0 bg-${step.accentColor}-500 rounded-full opacity-20 blur-md`}></div>
                  <span className="relative z-10">{step.icon}</span>
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-black border border-blue-500/50 flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Recommendations Section */}
      <div id="recommendations" className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="max-w-7xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm mb-4">
              AI RECOMMENDATIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Intelligent Financial Guidance
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
              Our AI engine analyzes your financial patterns to provide personalized recommendations that adapt to your changing needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Auto Purchases",
                description: "Based on your cash flow and savings, our AI suggests the optimal vehicle price range that won't disrupt your financial goals.",
                emoji: "🚗"
              },
              {
                title: "Investment Strategy",
                description: "Our AI analyzes your risk tolerance and financial goals to recommend personalized investment strategies tailored to your situation.",
                emoji: "📈"
              },
              {
                title: "Property Purchase Planning",
                description: "FinSage.ai evaluates your income stability, debt levels, and savings to help you make informed property investment decisions.",
                emoji: "🏡"
              }
            ].map((recommendation, index) => (
              <motion.div
                key={recommendation.title}
                className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-sm rounded-xl border border-gray-800/70 shadow-xl overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Glass effect on hover */}
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="p-8 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    {recommendation.emoji}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {recommendation.title}
                  </h3>
                  <p className="text-gray-400">
                    {recommendation.description}
                  </p>
                </div>

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-black py-24 relative">
        {/* Abstract background elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-900 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-400 text-sm mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their financial future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "Entrepreneur",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGIO7Yv0hm1CddARr645uEdokHRRJ1mPtmw&s",
                content: "FinSage.ai helped me understand my business cash flow in ways I never imagined. The AI recommendations have been spot on for my investment planning.",
                stars: 5,
                location: "Mumbai"
              },
              {
                name: "Rahul Mehta",
                role: "Software Engineer",
                image: "https://bottindia.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-20-at-12.17.37.jpeg",
                content: "The property purchase guidance saved me from making a costly mistake. The AI analysis showed me I wasn't ready yet, and suggested steps to improve my financial posture.",
                stars: 5,
                location: "Bangalore"
              },
              {
                name: "Ananya Patel",
                role: "Marketing Director",
                image: "https://m.media-amazon.com/images/S/amzn-author-media-prod/tk8klah7idcot626a1fu46meer._SY450_CR0%2C0%2C450%2C450_.jpg",
                content: "I've tried several financial apps, but FinSage.ai is in a league of its own. The predictive scenarios feature helped me visualize my retirement planning clearly.",
                stars: 4,
                location: "Delhi"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-gray-800/70 p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Background glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 filter blur-xl"></div>

                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 mr-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-600'}`}
                      fill={i < testimonial.stars ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>

                <p className="text-gray-400 mb-4">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <span>{testimonial.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-b from-black to-slate-950 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-8 md:p-12 border border-blue-800/30 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Abstract Elements */}
            <div className="absolute top-0 left-0 h-64 w-64 bg-blue-600 rounded-full filter blur-[100px] opacity-10"></div>
            <div className="absolute bottom-0 right-0 h-64 w-64 bg-purple-600 rounded-full filter blur-[100px] opacity-10"></div>

            <div className="relative z-10 text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Transform Your Financial Future?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Join thousands of forward-thinking individuals who trust FinSage.ai to guide their financial decisions.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link to="/login">
                  <motion.button
                    className="py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started Now
                  </motion.button>
                </Link>
                <motion.button
                  className="py-3 px-8 bg-transparent border border-gray-600 hover:border-gray-500 rounded-lg text-gray-400 hover:text-gray-300 font-semibold transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Demo
                </motion.button>
              </motion.div>

              <motion.div
                className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Shield className="h-4 w-4" />
                <span>No credit card required • 14-day free trial</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-b from-slate-950 to-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <img src="logo.png" alt="" className="w-10 h-10" />
                <span className="text-white text-lg font-bold ml-2">
                  Fin<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Sage.ai</span>
                </span>
              </div>
              <p className="text-gray-500 mb-4 max-w-xs">
                Advanced financial intelligence to help you make smarter decisions and secure your future.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} FinSage.ai • All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 text-sm hover:text-gray-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 text-sm hover:text-gray-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 text-sm hover:text-gray-400 transition-colors">
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
        <ChatBot />
      </footer>
    </motion.div>
  );
};

export default LandingPage;
