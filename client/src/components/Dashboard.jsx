import React from "react";
import {
  FaStar,
  FaTachometerAlt,
  FaEnvelope,
  FaStickyNote,
  FaChartBar,
  FaCalendarAlt,
  FaSignOutAlt,
  FaMoneyBillWave,
  FaPiggyBank,
  FaChartLine,
  FaBalanceScale,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  // Financial Overview Data
  const financialOverviewData = {
    netWorth: 125000,
    monthlySavings: 3200,
    investmentGrowth: 8.2,
    debtRatio: 0.28,
  };

  // Data for PieChart (Monthly Spending)
  const spendingData = [
    { name: "Subscriptions", value: 148.4 },
    { name: "Food & Dining", value: 614.16 },
    { name: "Housing", value: 824.28 },
    { name: "Transportation", value: 342.48 },
    { name: "Entertainment", value: 220.0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  // Cashflow Data
  const cashflowData = [
    { month: "Jan", income: 6500, expenses: 4200, net: 2300 },
    { month: "Feb", income: 7200, expenses: 3800, net: 3400 },
    { month: "Mar", income: 6800, expenses: 4100, net: 2700 },
    { month: "Apr", income: 7100, expenses: 3950, net: 3150 },
    { month: "May", income: 7500, expenses: 4300, net: 3200 },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-4 flex flex-col border-r border-gray-200">
        <div className="flex items-center mb-6">
          <FaStar className="text-2xl text-blue-600" />
          <span className="ml-2 text-xl font-semibold">
            Financial Time Machine
          </span>
        </div>
        <nav className="flex-1 align-middle">
          <ul>
            {[
              { icon: FaTachometerAlt, label: "Dashboard" },
              { icon: FaEnvelope, label: "Emails" },
              { icon: FaStickyNote, label: "Notes" },
              { icon: FaChartBar, label: "Reports" },
              { icon: FaCalendarAlt, label: "Calendar" },
            ].map(({ icon: Icon, label, badge }, i) => (
              <li key={i} className="mb-4">
                <a
                  className="flex items-center text-white hover:text-blue-600 "
                  href="#"
                >
                  <Icon className="mr-2" />
                  {label}
                  {badge && (
                    <span className="ml-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                      {badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <a
            className="flex items-center text-white hover:text-blue-600"
            href="#"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </a>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Mandal</h1>
            <p className="text-gray-500">
              Your current sales summary and activity.
            </p>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mr-4 cursor-pointer">
              New Simulation
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
              M
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-lg shadow border border-blue-600">
            <div className="flex items-center mb-4">
              <FaMoneyBillWave className="text-2xl mr-3 text-blue-300" />
              <h2 className="text-lg font-semibold">Net Worth</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              ${financialOverviewData.netWorth.toLocaleString()}
            </div>
            <div className="text-sm text-blue-200">+12% from last year</div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-700 p-6 rounded-lg shadow border border-green-600">
            <div className="flex items-center mb-4">
              <FaPiggyBank className="text-2xl mr-3 text-green-300" />
              <h2 className="text-lg font-semibold">Monthly Savings</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              ${financialOverviewData.monthlySavings.toLocaleString()}
            </div>
            <div className="text-sm text-green-200">25% of income</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-lg shadow border border-purple-600">
            <div className="flex items-center mb-4">
              <FaChartLine className="text-2xl mr-3 text-purple-300" />
              <h2 className="text-lg font-semibold">Investment Growth</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              {financialOverviewData.investmentGrowth}%
            </div>
            <div className="text-sm text-purple-200">Annualized return</div>
          </div>

          <div className="bg-gradient-to-br from-amber-900 to-amber-700 p-6 rounded-lg shadow border border-amber-600">
            <div className="flex items-center mb-4">
              <FaBalanceScale className="text-2xl mr-3 text-amber-300" />
              <h2 className="text-lg font-semibold">Debt Ratio</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              {financialOverviewData.debtRatio}
            </div>
            <div className="text-sm text-amber-200">Healthy range</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Spending */}
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Monthly Spending</h2>
              <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                <option>Last 6 Months</option>
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    cornerRadius={8}
                    label={({ name, percent }) =>
                      `${name}: $${(percent * 100).toFixed(0)}%`
                    }
                    dataKey="value"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "#111",
                      borderColor: "#333",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cashflow */}
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Monthly Cashflow</h2>
              <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                <option>Last 6 Months</option>
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      borderColor: "#333",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f87171"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="net"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
