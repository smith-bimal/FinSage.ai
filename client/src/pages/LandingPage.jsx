import React from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
        
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 p-6">
        {/* Header Section */}
        {/* <header className="w-full bg-black/20 backdrop-blur-xl shadow-md border-b border-gray-800/50"> */}
        <header className="w-full">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left Side - Logo/Image Placeholder */}
            <div className="flex items-center justify-start flex-1">
              <img
                src="https://img.freepik.com/premium-vector/free-vector-finance-logo-your-company_36293-37.jpg?semt=ais_hybrid&w=740"
                alt="Logo"
                className="h-16 w-16 object-contain" // Placeholder dimensions
              />
            </div>

            {/* Center Navigation Menu */}
            <nav className="flex items-center bg-black/30 border border-gray-700 rounded-full px-6 py-2 shadow-md mx-auto">
              <ul className="flex items-center space-x-6 text-gray-300">
                <li className="hover:text-white cursor-pointer transition-all duration-200">
                  Home
                </li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">
                  Work
                </li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">
                  About
                </li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">
                  Blog
                </li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">
                  More
                </li>
                <li>
                  <button className="py-1 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                    Book a Call
                  </button>
                </li>
              </ul>
            </nav>

            {/* Right Side - Login/Logout Buttons */}
            <div className="flex items-center justify-end flex-1 space-x-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
              <button className="flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12h-6m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                <span>Login</span>
              </button>
            </motion.button>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button className="flex items-center space-x-2 py-2 px-4 bg-transparent border border-gray-600 hover:border-gray-500 rounded-lg text-gray-400 hover:text-gray-300 font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15V18.75A2.25 2.25 0 0113.5 21h-9A2.25 2.25 0 012.25 18.75V5.25A2.25 2.25 0 014.5 3h9a2.25 2.25 0 012.25 2.25V9"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12h-6m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                <span>Register</span>
              </button>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-6 max-w-4xl"
            >
        <div className="text-center space-y-6 max-w-4xl">
          <br />
          <br />
          <br />
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Empower Your Financial Journey
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Discover smarter ways to manage your finances and make informed
            decisions with our cutting-edge tools and insights.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
              Get Started
            </button>
            <button className="py-3 px-6 bg-transparent border border-gray-600 hover:border-gray-500 rounded-lg text-gray-400 hover:text-gray-300 font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Learn More
            </button>
          </div>
        </div>
        </motion.div>
        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
          {/* Left Side - Text and Buttons */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Feel the best experience with our features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center py-4 px-6 bg-black/30 border border-purple-600 rounded-lg text-purple-400 hover:text-white hover:border-purple-400 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0-13H9m3 0h3"
                  />
                </svg>
                Track transactions
              </button>
              <button className="flex items-center justify-center py-4 px-6 bg-black/30 border border-purple-600 rounded-lg text-purple-400 hover:text-white hover:border-purple-400 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0-13H9m3 0h3"
                  />
                </svg>
                Analyze future scenarios
              </button>
              <button className="flex items-center justify-center py-4 px-6 bg-black/30 border border-purple-600 rounded-lg text-purple-400 hover:text-white hover:border-purple-400 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0-13H9m3 0h3"
                  />
                </svg>
                Privacy First, Always
              </button>
              <button className="flex items-center justify-center py-4 px-6 bg-black/30 border border-purple-600 rounded-lg text-purple-400 hover:text-white hover:border-purple-400 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0-13H9m3 0h3"
                  />
                </svg>
                Analyze your expenses
              </button>
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="flex justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src="../public/girl.jpg"
            className="w-full max-w-md h-auto object-contain bg-black/20 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50" // keep your styles
            />
            {/* <img
              src="../public/girl.jpg"
              alt="Feature Preview"
              className="w-full max-w-md h-auto object-contain bg-black/20 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50"
              style={{ height: "400px", width: "300px" }} // Fixed dimensions
            /> */}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Card */}
            <div className="p-6 bg-black/20 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-hand-coins-icon lucide-hand-coins"
                  >
                    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                    <path d="m2 16 6 6" />
                    <circle cx="16" cy="9" r="2.9" />
                    <circle cx="6" cy="5" r="3" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl text-left font-bold text-white">
                Visualize your future spending & lifestyle
              </h3>
              <br />
              <p className="text-gray-400 text-left mb-4">
                Ever wondered how buying a car or house affects your finances?
                Simulate real-life financial decisions and see their future
                impact instantly.
              </p>
              <div className="flex justify-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src="https://www.projectoty.com/wp-content/uploads/2021/05/visualizeyourfutureself.jpg"
                className="w-full max-w-md h-auto object-contain border border-gray-800/50 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                />

                {/* <img
                  src="https://www.projectoty.com/wp-content/uploads/2021/05/visualizeyourfutureself.jpg"
                  alt="Custom Card Preview"
                  className="w-full max-w-md h-auto object-contain border border-gray-800/50 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                  style={{ height: "200px", width: "300px" }} // Placeholder dimensions
                /> */}
              </div>
            </div>

            {/* Right Card */}
            <div className="p-6 bg-black/20 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chart-line-icon lucide-chart-line"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl text-left font-bold text-white">
                Personalized your financial insights and goals
              </h3>
              <br />
              <p className="text-gray-400 text-left mb-4">
                Track your spending patterns, analyze income or expenses easily,
                and receive personalized recommendations to optimize your
                financial habits.
              </p>
              <div className="flex justify-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src="https://assets.upstox.com/content/assets/images/course_image/pigg_priyanka.webp"
                className="w-full max-w-md h-auto object-contain border border-gray-800/50 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                />
                {/* <img
                  src="https://assets.upstox.com/content/assets/images/course_image/pigg_priyanka.webp"
                  alt="Financial Insights Preview"
                  className="w-full max-w-md h-auto object-contain border border-gray-800/50 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                  style={{ height: "200px", width: "300px" }} // Placeholder dimensions
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Smart Recommendations Section */}
        <div className="mt-16 max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white/90">
            Smart Recommendations for Your Future
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Based on your financial health, we guide you on whether it’s the
            right time to invest, spend, or save.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-black/30 rounded-xl border border-purple-600 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                🚗 Buy a Car?
              </h3>
              <p className="text-gray-300">
                Based on your cash flow and savings, you can afford a car worth
                up to ₹10 Lakhs without disrupting future goals.
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-purple-600 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                📈 Invest in SIPs
              </h3>
              <p className="text-gray-300">
                We suggest starting a ₹5,000/month SIP to build ₹10 Lakhs in 10
                years — based on your disposable income.
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-purple-600 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                🏡 Home Loan Readiness
              </h3>
              <p className="text-gray-300">
                You can safely take a ₹40 Lakh home loan with your current
                debt-to-income ratio at just 25%.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl items-center">
          {/* Left Side - Image Placeholder */}
          <div className="flex justify-center ">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src="../public/crop.jpg"
            className="w-full max-w-md md:max-w-lg h-auto object-contain border border-gray-800/50 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            />

            {/* <img
              src="../public/crop.jpg"
              alt="Financial App Preview"
              className="w-full max-w-md md:max-w-lg h-auto object-contain border border-gray-800/50 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
              style={{ height: "400px", width: "400px" }} // Fixed dimensions
            /> */}
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Control your financial future easily
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              From easy money management, to financial goals and investments.
              Open your account in a flash.
            </p>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center md:justify-start">
              <button className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                Open account
              </button>
              <button className="py-3 px-6 bg-transparent border border-gray-600 hover:border-gray-500 rounded-lg text-gray-400 hover:text-gray-300 font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Forecast your finances
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-4xl font-bold text-white">15 Million+</span>
            </div>
            <p className="text-gray-400">
              Trusted by millions of satisfied users, our financial services
              have made a real impact on people's lives.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white/90">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Join thousands of users who trust us to help them achieve their
            financial goals.
          </p>
          
          <button className="py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            Get Started Now
          </button>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white/90">
            Real Users. Real Results.
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Hear how we helped thousands take control of their financial future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/30 p-6 rounded-xl border border-gray-700 shadow-lg">
              <p className="text-gray-300 italic">
                “This app helped me realize I was overspending on food delivery.
                I've saved ₹8,000 in two months!”
              </p>
              <p className="mt-4 font-semibold text-purple-400">
                — Raj, Mumbai
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-xl border border-gray-700 shadow-lg">
              <p className="text-gray-300 italic">
                “The recommendation to delay my car purchase saved me from a bad
                EMI decision. Super helpful!”
              </p>
              <p className="mt-4 font-semibold text-purple-400">
                — Ananya, Bangalore
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-xl border border-gray-700 shadow-lg">
              <p className="text-gray-300 italic">
                “I never thought managing money could be fun and insightful. Now
                I track everything effortlessly.”
              </p>
              <p className="mt-4 font-semibold text-purple-400">
                — Karthik, Hyderabad
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-16 bg-black/20 backdrop-blur-xl rounded-t-lg shadow-[0_-8px_32px_0_rgba(0,0,0,0.5)] border-t border-gray-800/50 w-full">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Newsletter Section */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-2">
                <Mail className="text-yellow-400 w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">
                  Keep up with the latest
                </h3>
              </div>
              <p className="text-sm text-gray-400">
                Join our newsletter to stay up to date on features and releases.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-transparent border border-gray-600 rounded-md text-sm text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button className="px-3 py-2 bg-yellow-400 text-black text-sm font-medium rounded-md hover:bg-yellow-500 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Column 1 - Company */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Company</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Press Kit</li>
              </ul>
            </div>

            {/* Column 2 - Support */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Support</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>Help</li>
                <li>Contact</li>
                <li>FAQ</li>
              </ul>
            </div>

            {/* Column 3 - Legal */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Legal</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Licenses</li>
              </ul>
            </div>

            {/* Column 4 - Resources */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Resources</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>Blog</li>
                <li>Developers</li>
                <li>Community</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-6 pt-5">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
              <p>&copy; 2025 Your Company. All rights reserved.</p>
              <div className="flex space-x-4 mt-3 md:mt-0">
                {["facebook", "instagram", "linkedin", "twitter"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="transform hover:scale-110 hover:text-purple-400 transition-all duration-300"
                    >
                      <i className={`fab fa-${social} fa-lg`}></i>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default LandingPage;
