import React, { useState } from "react";
import { LineChart, PieChart } from "@mui/x-charts";
import { Cpu, TrendingUp, BarChart3, PieChart as PieChartIcon, ChevronRight, Mail, Shield, Activity, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [projectionType, setProjectionType] = useState("shortTerm");

  const financialSnapshot = {
    income: 85000,
    expenses: 3900,
    savings: 18500,
    investments: 30000,
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-gray-800/50 p-6">
        <div className="flex items-center mb-8">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/logo.png" alt="FinSage Logo" className="w-10 h-10" />
            <motion.div
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-indigo-400"
              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          </motion.div>
          <div className="ml-3">
            <span className="text-white text-lg font-extrabold">
              Fin<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Sage.ai</span>
            </span>
            <span className="block text-xs text-gray-400">Financial Intelligence</span>
          </div>
        </div>
        <nav className="space-y-4">
          <button className="flex items-center px-3 py-2 w-full rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 text-white">
            <TrendingUp className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button className="flex items-center px-3 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </button>
          <button className="flex items-center px-3 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <PieChartIcon className="h-5 w-5 mr-3" />
            Analytics
          </button>
          <button className="flex items-center px-3 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Mail className="h-5 w-5 mr-3" />
            Messages
          </button>
          <button className="flex items-center px-3 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Shield className="h-5 w-5 mr-3" />
            Security
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, User</h2>
            <p className="text-gray-400 text-sm">Track your financial progress and insights</p>
          </div>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center group shadow-lg shadow-purple-500/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            New Simulation
            <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Income", value: formatter.format(financialSnapshot.income), color: "from-blue-600/20 to-blue-500/10", icon: <DollarSign className="h-5 w-5 text-blue-400" /> },
            { title: "Total Expenses", value: formatter.format(financialSnapshot.expenses), color: "from-red-600/20 to-red-500/10", icon: <BarChart3 className="h-5 w-5 text-red-400" /> },
            { title: "Total Savings", value: formatter.format(financialSnapshot.savings), color: "from-green-600/20 to-green-500/10", icon: <TrendingUp className="h-5 w-5 text-green-400" /> },
            { title: "Investments", value: formatter.format(financialSnapshot.investments), color: "from-purple-600/20 to-purple-500/10", icon: <Activity className="h-5 w-5 text-purple-400" /> },
          ].map((card, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl bg-black/20 backdrop-blur-xl border border-gray-800/50 shadow-lg relative overflow-hidden group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Glassmorphic gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>

              <div className="relative z-10 flex items-center">
                <div className="bg-black/30 rounded-lg p-3 mr-4">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">{card.title}</h3>
                  <p className="text-2xl font-bold mt-1 text-white">{card.value}</p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section with 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1: Expense Breakdown */}
          <motion.div
            className="p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-lg shadow-purple-900/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/10 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-600/20 rounded-lg mr-3">
                  <PieChartIcon className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Expense Breakdown</h3>
              </div>
              <PieChart
                series={[
                  {
                    data: [
                      { id: "Food", value: 600, color: "#60a5fa" },
                      { id: "Rent", value: 1800, color: "#f472b6" },
                      { id: "Utilities", value: 350, color: "#4ade80" },
                      { id: "Entertainment", value: 400, color: "#facc15" },
                      { id: "Transportation", value: 250, color: "#a78bfa" },
                    ],
                    innerRadius: 50,
                    outerRadius: 100,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 48, additionalRadius: -8, color: 'gray' },
                  },
                ]}
                width={400}
                height={300}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                legend={{
                  direction: "column",
                  position: { vertical: "middle", horizontal: "right" },
                  padding: 20,
                  labelStyle: {
                    fill: "#cbd5e1",
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Chart 2: Financial Projections */}
          <motion.div
            className="p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-lg shadow-purple-900/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/10 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-600/20 rounded-lg mr-3">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Financial Projections</h3>
              </div>
              <LineChart
                xAxis={[
                  {
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    scaleType: "band",
                    tickLabelStyle: { fill: "#cbd5e1", fontSize: 12 },
                  },
                ]}
                series={[
                  {
                    data: [1000, 2000, 3000, 4000, 5000, 6000],
                    label: "Income",
                    color: "#60a5fa",
                    area: true,
                    showMark: false,
                  },
                  {
                    data: [800, 1500, 2500, 3500, 4500, 5500],
                    label: "Expenses",
                    color: "#f87171",
                    area: true,
                    showMark: false,
                  },
                ]}
                width={400}
                height={300}
              />
            </div>
          </motion.div>

          {/* Chart 3: Savings Goals */}
          <motion.div
            className="p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-lg shadow-purple-900/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-blue-600/10 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-600/20 rounded-lg mr-3">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Savings Goals</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Emergency Fund", current: 6500, target: 10000, percentage: 65, color: "bg-blue-500" },
                  { name: "Vacation", current: 2000, target: 5000, percentage: 40, color: "bg-purple-500" },
                  { name: "New Car", current: 12000, target: 30000, percentage: 40, color: "bg-green-500" },
                ].map((goal) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{goal.name}</span>
                      <span className="text-gray-300">
                        {formatter.format(goal.current)} / {formatter.format(goal.target)}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${goal.color}`}
                        style={{ width: `${goal.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 text-right">{goal.percentage}% completed</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chart 4: Upcoming Bills */}
          <motion.div
            className="p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-lg shadow-purple-900/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-red-600/10 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-600/20 rounded-lg mr-3">
                  <BarChart3 className="h-5 w-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Upcoming Bills</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Rent", amount: 1800, date: "Jun 1", status: "upcoming" },
                  { name: "Electricity", amount: 120, date: "Jun 5", status: "upcoming" },
                  { name: "Internet", amount: 80, date: "Jun 10", status: "upcoming" },
                  { name: "Phone", amount: 60, date: "Jun 15", status: "upcoming" },
                ].map((bill) => (
                  <div
                    key={bill.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                      <span className="text-gray-300">{bill.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {formatter.format(bill.amount)}
                      </div>
                      <div className="text-xs text-gray-400">{bill.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          className="p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-lg shadow-purple-900/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-600/20 rounded-lg mr-3">
                  <Activity className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 text-xs font-medium text-gray-500">TRANSACTION</th>
                    <th className="pb-3 text-xs font-medium text-gray-500">CATEGORY</th>
                    <th className="pb-3 text-xs font-medium text-gray-500">DATE</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { name: "Grocery Store", category: "Food", date: "May 28", amount: -85.25, type: "expense" },
                    { name: "Salary Deposit", category: "Income", date: "May 25", amount: 4500, type: "income" },
                    { name: "Restaurant", category: "Food", date: "May 24", amount: -56.40, type: "expense" },
                    { name: "Netflix", category: "Entertainment", date: "May 22", amount: -17.99, type: "expense" },
                    { name: "Gas Station", category: "Transportation", date: "May 20", amount: -45.30, type: "expense" },
                  ].map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-800/50">
                      <td className="py-3 text-gray-300">{transaction.name}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${transaction.category === "Food" ? "bg-blue-900/30 text-blue-400" :
                          transaction.category === "Income" ? "bg-green-900/30 text-green-400" :
                            transaction.category === "Entertainment" ? "bg-purple-900/30 text-purple-400" :
                              "bg-yellow-900/30 text-yellow-400"
                          }`}>
                          {transaction.category}
                        </span>
                      </td>
                      <td className="text-gray-500">{transaction.date}</td>
                      <td className={`text-right ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}>
                        {transaction.type === "income" ? "+" : ""}{formatter.format(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
