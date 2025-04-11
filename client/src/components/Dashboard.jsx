import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const expenseBreakdown = [
    { category: "Rent", amount: 2000 },
    { category: "Groceries", amount: 500 },
  ];

  const incomeVsExpenses = [
    { label: "Income", amount: 7000 },
    { label: "Expenses", amount: 2500 },
  ];

  const shortTermData = [
    { date: "Jan", actual: 4000, recommended: 4500 },
    { date: "Feb", actual: 3000, recommended: 4000 },
    { date: "Mar", actual: 2000, recommended: 3500 },
    { date: "Apr", actual: 2780, recommended: 3000 },
    { date: "May", actual: 1890, recommended: 2500 },
    { date: "Jun", actual: 2390, recommended: 2000 },
    { date: "Jul", actual: 3490, recommended: 1500 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-8"
      >
        <div className="flex items-center">
          <FaStar className="text-2xl text-blue-600" />
          <h1 className="text-2xl font-bold ml-3">Financial Dashboard</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
        >
          New Simulation
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="col-span-12 grid grid-cols-3 gap-6"
        >
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold mb-4">
              $
              {(
                incomeVsExpenses[0].amount - incomeVsExpenses[1].amount
              ).toLocaleString()}
            </p>
            <div className="h-24">
              <ResponsiveContainer>
                <LineChart data={shortTermData}>
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-gray-400 mb-2">Income</h3>
            <p className="text-2xl font-bold text-green-400">
              ${incomeVsExpenses[0].amount.toLocaleString()}
            </p>
            <div className="mt-4 text-sm text-gray-400">
              +12% from last month
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-gray-400 mb-2">Expenses</h3>
            <p className="text-2xl font-bold text-white">+2350</p>
            <div className="mt-1 text-sm text-gray-400">
              +180.1% from last month
            </div>
            <div className="mt-4 flex justify-center">
              <div className="flex items-end gap-2 h-24">
                {[60, 80, 55, 70, 85, 90, 60].map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md w-6"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-4 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
        >
          <h2 className="text-xl font-bold mb-6">Fear & Greed Index</h2>
          <div className="w-48 h-48 mx-auto">
            <CircularProgressbar
              value={65}
              text="Greed"
              styles={buildStyles({
                pathColor: `rgba(74, 222, 128, ${65 / 100})`,
                textColor: "#fff",
                trailColor: "rgba(255,255,255,0.1)",
              })}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 lg:col-span-8 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
        >
          <h2 className="text-xl font-bold mb-6 text-white">
            Expense Breakdown
          </h2>

            <CardHeader>
              <CardTitle className="text-white">Expenses by Category</CardTitle>
              <CardDescription>
                Based on your credit and debit cards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis dataKey="category" stroke="#cbd5e0" />
                    <YAxis stroke="#cbd5e0" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#60a5fa"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <div className="px-6 pb-4 text-sm text-gray-400">
              <p>Expenses increased by 5.2% compared to last month.</p>
              <p className="mt-1">Tracking over the past 6 months.</p>
            </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
        >
          <h2 className="text-xl font-bold mb-4">Financial Projections</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <AreaChart data={shortTermData}>
                <defs>
                  <linearGradient
                    id="actualGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="recommendedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#4ade80"
                  fillOpacity={1}
                  fill="url(#actualGradient)"
                  name="Actual Growth"
                />
                <Area
                  type="monotone"
                  dataKey="recommended"
                  stroke="#60a5fa"
                  fillOpacity={1}
                  fill="url(#recommendedGradient)"
                  name="Recommended Path"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
