import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Tabs, Tab } from "@mui/material";
import { Cpu, ArrowRight, BarChart3, PieChart as PieChartIcon, TrendingUp, AlertTriangle, ChevronRight, Activity } from "lucide-react";
import { FNGSvg, FNGLabels } from './FNGComponents';
import { motion } from "framer-motion";
import { 
  Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale, 
  ArcElement, 
  Tooltip, 
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [projectionType, setProjectionType] = useState("shortTerm");

  const chartData = {
    expenseBreakdown: [
      { category: "Food", amount: 600 },
      { category: "Rent", amount: 1800 },
      { category: "Utilities", amount: 350 },
      { category: "Entertainment", amount: 400 },
      { category: "Transportation", amount: 250 },
      { category: "Shopping", amount: 500 }
    ],
    incomeVsExpenses: [
      { label: "Income", amount: 85000 },
      { label: "Expenses", amount: 3900 }
    ],
    projections: {
      shortTerm: {
        timestamps: [
          "2025-05-01", "2025-06-01", "2025-07-01", "2025-08-01",
          "2025-09-01", "2025-10-01", "2025-11-01", "2025-12-01",
        ],
        actualValues: [18500, 18750, 19000, 16250, 25500, 19750, 28000, 20250],
        recommendedValues: [18500, 26683, 30866, 43049, 43233, 59416, 67600, 62783]
      },
      longTerm: {
        timestamps: [
          "2025-01-01", "2026-01-01", "2027-01-01", "2028-01-01", "2029-01-01"
        ],
        actualValues: [51750, 55157, 58764, 62585, 66633],
        recommendedValues: [59000, 141680, 241737, 361624, 504013]
      }
    }
  };

  const recommendations = [
    {
      _id: { $oid: "67f9a247903f7ac6a0270fdb" },
      category: "Expense Optimization",
      action: "Reduce entertainment and shopping expenses by 20% each.",
      rationale: "Entertainment and shopping categories represent a significant portion of discretionary spending. Reducing these can free up funds for savings and investments.",
      confidenceScore: 75,
      potentialImpact: { monthly: 180, yearly: 2160 }
    },
    {
      _id: { $oid: "67f9a247903f7ac6a0270fdc" },
      category: "Savings Targets",
      action: "Increase monthly savings rate to at least 20% of income.",
      rationale: "A higher savings rate allows for faster accumulation of wealth and greater financial security. The current savings rate is below optimal.",
      confidenceScore: 90,
      potentialImpact: { monthly: 8500, yearly: 102000 }
    },
    {
      _id: { $oid: "67f9a247903f7ac6a0270fdd" },
      category: "Investment Strategy",
      action: "Reallocate investment portfolio to include a higher percentage of stocks for potentially higher returns, considering your risk tolerance.",
      rationale: "While fixed deposits provide security, a greater allocation to stocks (within risk tolerance) can lead to higher long-term growth.",
      confidenceScore: 80,
      potentialImpact: { monthly: 250, yearly: 3000 }
    }
  ];

  const pastDecisionsImpact = {
    positiveImpacts: [
      {
        _id: { $oid: "67f9acf97fc289ea3479e4b1" },
        decision: "Allocating Funds to Investments",
        impact: "Building long-term wealth",
        financialEffect: "Investments of $30,000 represent a solid foundation for future growth and potential retirement security."
      },
      {
        _id: { $oid: "67f9acf97fc289ea3479e4b2" },
        decision: "Maintaining a budget for essential needs",
        impact: "Ensuring basic needs are met.",
        financialEffect: "Consistent budgeting for essentials helps avoid debt and maintain financial stability."
      }
    ],
    negativeImpacts: [
      {
        _id: { $oid: "67f9acf97fc289ea3479e4b3" },
        decision: "Low Savings Rate",
        impact: "Limited financial flexibility and potential for missed opportunities.",
        financialEffect: "Savings of $18,500 is low relative to the monthly income. This limits the ability to handle unexpected expenses."
      },
      {
        _id: { $oid: "67f9acf97fc289ea3479e4b4" },
        decision: "Potentially High Spending on Shopping and Entertainment",
        impact: "May hinder long-term financial goals.",
        financialEffect: "Spending $500 on shopping and $400 on entertainment each month represents a significant portion that could be directed toward savings."
      }
    ],
    suggestions: [
      {
        _id: { $oid: "67f9acf97fc289ea3479e4b6" },
        area: "Savings",
        suggestion: "Increase monthly savings rate by at least 10% of your income.",
        potentialBenefit: "Build a stronger emergency fund and accelerate progress toward financial goals."
      }
    ]
  };

  const financialSnapshot = {
    income: 85000,
    expenses: 3900,
    savings: 18500,
    investments: 30000
  };

  const savingsPercentage = Math.round(
    ((chartData.incomeVsExpenses[0].amount - chartData.incomeVsExpenses[1].amount) / chartData.incomeVsExpenses[0].amount) * 100
  );

  const doughnutData = {
    labels: chartData.expenseBreakdown.map(item => item.category),
    datasets: [
      {
        data: chartData.expenseBreakdown.map(item => item.amount),
        backgroundColor: ["#60a5fa", "#f472b6", "#4ade80", "#facc15", "#a78bfa", "#f87171"],
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        cutout: '70%',
        hoverOffset: 5
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: "#cbd5e1",
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${formatter.format(context.raw)}`;
          }
        }
      }
    }
  };

  const createGradient = (ctx, colorStart, colorEnd) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  const lineData = {
    labels: chartData.projections[projectionType].timestamps.map(ts =>
      new Date(ts).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    ),
    datasets: [
      {
        label: "Current Path",
        data: chartData.projections[projectionType].actualValues,
        borderColor: "#8b5cf6",
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx} = chart;
          return createGradient(ctx, "rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 0)");
        },
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#8b5cf6",
        borderWidth: 3
      },
      {
        label: "Recommended Path",
        data: chartData.projections[projectionType].recommendedValues,
        borderColor: "#22d3ee",
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx} = chart;
          return createGradient(ctx, "rgba(34, 211, 238, 0.5)", "rgba(34, 211, 238, 0)");
        },
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#22d3ee",
        borderWidth: 3
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: "#cbd5e1",
          usePointStyle: true,
          boxWidth: 6,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 8
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
          font: {
            size: 10
          }
        },
        grid: {
          color: "rgba(51, 65, 85, 0.3)",
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: "#94a3b8",
          font: {
            size: 10
          }
        },
        grid: {
          color: "rgba(51, 65, 85, 0.3)",
          drawBorder: false
        },
        beginAtZero: true
      }
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 6,
        borderWidth: 0,
        hitRadius: 8
      },
      line: {
        tension: 0.4,
        borderWidth: 3,
        borderJoinStyle: 'round',
        capBezierPoints: true
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-950 text-white p-6">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <motion.div
            className="relative mr-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/logo.png" alt="FinSage.ai Logo" className="w-10 h-10" />
            <motion.div
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-indigo-400"
              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          </motion.div>
          <div>
            <span className="text-white text-xl font-extrabold">
              Fin<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Sage.ai</span>
            </span>
            <span className="block text-xs text-gray-400">Financial Dashboard</span>
          </div>
        </div>
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center group shadow-lg shadow-purple-500/20"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          New Simulation
          <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[{
          title: "Total Income",
          value: `$${financialSnapshot.income}`,
          icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
          change: "+5% from last month",
          color: "from-blue-500/20 to-blue-600/20",
          iconBg: "bg-blue-600/20",
          iconText: "text-blue-400"
        },
        {
          title: "Total Expenses",
          value: `$${financialSnapshot.expenses}`,
          icon: <BarChart3 className="h-5 w-5 text-red-400" />,
          change: "+3.2% from last month",
          color: "from-red-500/20 to-red-600/20",
          iconBg: "bg-red-600/20",
          iconText: "text-red-400"
        },
        {
          title: "Total Savings",
          value: `$${financialSnapshot.savings}`,
          icon: <PieChartIcon className="h-5 w-5 text-green-400" />,
          change: "+7.8% from last month",
          color: "from-green-500/20 to-green-600/20",
          iconBg: "bg-green-600/20",
          iconText: "text-green-400"
        },
        {
          title: "Investments",
          value: `$${financialSnapshot.investments}`,
          icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
          change: "+2.1% from last month",
          color: "from-purple-500/20 to-purple-600/20",
          iconBg: "bg-purple-600/20",
          iconText: "text-purple-400"
        }].map((card, index) => (
          <motion.div
            key={index}
            className={`bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition-colors`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 }, boxShadow: "0 15px 30px -10px rgba(131, 56, 236, 0.15)" }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm text-gray-400">{card.title}</p>
                <p className="text-2xl font-bold mt-1 text-white">{card.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${card.iconBg} backdrop-blur-md`}>
                {React.cloneElement(card.icon, { className: `h-5 w-5 ${card.iconText}` })}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 relative z-10">{card.change}</p>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-80 group-hover:w-32 group-hover:h-32 transition-all duration-300"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-purple-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ boxShadow: "0 15px 30px -10px rgba(131, 56, 236, 0.15)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-600/20 backdrop-blur-md rounded-lg mr-3">
                  <PieChartIcon className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Expense Breakdown</h2>
              </div>
              <span className="text-xs text-gray-400 bg-gray-800/50 backdrop-blur-md px-2 py-1 rounded-full border border-gray-700/50">Monthly</span>
            </div>
            <div className="flex justify-center h-[240px] relative">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <p className="text-2xl font-bold text-white">{chartData.expenseBreakdown.reduce((acc, item) => acc + item.amount, 0)}</p>
                <p className="text-xs text-gray-400">Total Expenses</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-blue-500/30 transition-all duration-300 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.15)" }}
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
            
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600/20 backdrop-blur-md rounded-lg mr-3">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Financial Projections</h2>
              </div>
              <Tabs
                value={projectionType}
                onChange={(e, newValue) => setProjectionType(newValue)}
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: "#60a5fa" } }}
                sx={{ minHeight: 'auto' }}
              >
                <Tab value="shortTerm" label="Short Term" sx={{ color: "#cbd5e1", fontSize: "0.8rem", padding: '6px 12px', minHeight: 'auto', minWidth: 'auto', '&.Mui-selected': { color: "#60a5fa", fontWeight: 600 } }} />
                <Tab value="longTerm" label="Long Term" sx={{ color: "#cbd5e1", fontSize: "0.8rem", padding: '6px 12px', minHeight: 'auto', minWidth: 'auto', '&.Mui-selected': { color: "#60a5fa", fontWeight: 600 } }} />
              </Tabs>
            </div>
            <div className="h-[320px]">
              <Line data={lineData} options={lineOptions} />
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/50 flex justify-between text-xs text-gray-400 relative z-10">
              <div><span className="font-medium text-gray-300">Projected Growth:</span> {projectionType === 'shortTerm' ? '+310%' : '+2724%'}</div>
              <div><span className="font-medium text-gray-300">Timeframe:</span> {projectionType === 'shortTerm' ? '12 months' : '10 years'}</div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-purple-500/30 transition-all duration-300 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ boxShadow: "0 15px 30px -10px rgba(131, 56, 236, 0.15)" }}
          >
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center">
                <div className="p-2 bg-purple-600/20 backdrop-blur-md rounded-lg mr-3">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Savings Meter</h2>
              </div>
              <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs border backdrop-blur-md ${savingsPercentage >= 20 ? 'bg-green-900/30 border-green-700/30 text-green-400' : savingsPercentage >= 10 ? 'bg-yellow-900/30 border-yellow-700/30 text-yellow-400' : 'bg-red-900/30 border-red-700/30 text-red-400'}`}>
                {savingsPercentage >= 20 ? "On Track" : savingsPercentage >= 10 ? "Improving" : "Needs Attention"}
              </span>
            </div>
            <div className="relative">
              <FNGSvg />
              <FNGLabels />
            </div>
            <div className="text-center text-sm text-gray-400 mt-2">
              <p className="mb-1">Target: 20% of Income</p>
              <p className={savingsPercentage >= 20 ? "text-green-400" : savingsPercentage >= 10 ? "text-yellow-400" : "text-red-400"}>
                {savingsPercentage >= 20 ? "Great job! You're meeting your savings target." : savingsPercentage >= 10 ? "Almost there! Try to increase your savings." : "Your savings rate needs attention."}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-blue-500/30 transition-all duration-300 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.15)" }}
          >
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600/20 backdrop-blur-md rounded-lg mr-3">
                  <Cpu className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
              </div>
              <span className="text-xs inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 backdrop-blur-md">AI Generated</span>
            </div>
            <div className="space-y-3 relative z-10">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec._id.$oid}
                  className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer group relative overflow-hidden"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between mb-2 items-start">
                      <span className="text-sm font-medium text-blue-400">{rec.category}</span>
                      <div className="flex items-center bg-blue-900/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-blue-700/50">
                        <span className="text-xs text-blue-300">{rec.confidenceScore}% Confidence</span>
                      </div>
                    </div>
                    <p className="text-white text-sm mb-1 group-hover:text-blue-100 transition-colors">{rec.action}</p>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">{rec.rationale}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> Monthly: +${rec.potentialImpact.monthly}</span>
                      <span className="text-green-400 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> Yearly: +${rec.potentialImpact.yearly}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </motion.div>
              ))}
              <motion.button
                className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-blue-600/50 rounded-lg transition-colors flex items-center justify-center group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                View All Recommendations
                <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mt-6 bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-indigo-500/30 transition-all duration-300 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ boxShadow: "0 15px 30px -10px rgba(99, 102, 241, 0.15)" }}
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
        
        <div className="flex items-center mb-6 relative z-10">
           <div className="p-2 bg-indigo-600/20 backdrop-blur-md rounded-lg mr-3">
             <Activity className="h-5 w-5 text-indigo-400" />
           </div>
           <h2 className="text-xl font-semibold text-white">Financial Decision Impact Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div>
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-green-900/30 backdrop-blur-md rounded-md mr-2 border border-green-700/30">
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-green-400">Positive Impacts</h3>
            </div>
            {pastDecisionsImpact.positiveImpacts.map((impact, index) => (
              <motion.div
                key={impact._id.$oid}
                className="bg-gray-900/30 backdrop-blur-md border border-green-800/30 rounded-lg p-4 mb-3 hover:border-green-600/50 transition-all cursor-pointer relative overflow-hidden group"
                whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.15)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h4 className="text-white font-medium">{impact.decision}</h4>
                  <p className="text-green-400 text-sm mt-1">{impact.impact}</p>
                  <p className="text-xs text-gray-400 mt-2">{impact.financialEffect}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div>
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-red-900/30 backdrop-blur-md rounded-md mr-2 border border-red-700/30">
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-red-400">Negative Impacts</h3>
            </div>
            {pastDecisionsImpact.negativeImpacts.map((impact, index) => (
              <motion.div
                key={impact._id.$oid}
                className="bg-gray-900/30 backdrop-blur-md border border-red-800/30 rounded-lg p-4 mb-3 hover:border-red-600/50 transition-all cursor-pointer relative overflow-hidden group"
                whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(248, 113, 113, 0.15)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 <div className="relative z-10">
                  <h4 className="text-white font-medium">{impact.decision}</h4>
                  <p className="text-red-400 text-sm mt-1">{impact.impact}</p>
                  <p className="text-xs text-gray-400 mt-2">{impact.financialEffect}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Updated just now • <span className="text-blue-400 cursor-pointer hover:underline">Refresh data</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
