/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { TrendingUp, BarChart3, PieChart as PieChartIcon, AlertTriangle, Loader } from "lucide-react";
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
import { useParams, useNavigate } from "react-router";
import api from '../config/axios.config.js';

// Import components
import Header from '../components/Header.jsx';
import SimulationInfo from '../components/dashboard/SimulationInfo.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import ExpenseBreakdownChart from '../components/dashboard/ExpenseBreakdownChart.jsx';
import FinancialProjections from '../components/dashboard/FinancialProjections.jsx';
import SavingsMeter from '../components/dashboard/SavingsMeter.jsx';
import AIRecommendations from '../components/dashboard/AIRecommendations.jsx';
import DecisionImpactAnalysis from '../components/dashboard/DecisionImpactAnalysis.jsx';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [projectionType, setProjectionType] = useState("shortTerm");
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulationData, setSimulationData] = useState(null);
  const [financialHistory, setFinancialHistory] = useState(null);
  const [formatter] = useState(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }));

  const handleReloadData = () => {
    navigate(0); // Using navigate(0) is equivalent to refreshing the page
  };

  useEffect(() => {
    const fetchSimulationData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
          navigate('/login');
          return;
        }

        let simulationResult;
        const { data } = await api.get(`/simulations/${userId}/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        simulationResult = Array.isArray(data) ? data[0] : data;

        try {
          const { data: historyData } = await api.get(`/financial/history/${params.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFinancialHistory(historyData);
        } catch (historyError) {
          console.error("Error fetching financial history:", historyError);
        }

        setSimulationData(simulationResult);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching simulation data:', err);
        setError(err.response?.data?.message || 'Failed to load simulation data');
        setLoading(false);
      }
    };

    fetchSimulationData();
  }, [params.id, navigate]);

  const chartData = useMemo(() => {
    if (!simulationData) return {
      expenseBreakdown: [],
      incomeVsExpenses: [],
      projections: {
        shortTerm: { timestamps: [], actualValues: [], recommendedValues: [] },
        longTerm: { timestamps: [], actualValues: [], recommendedValues: [] }
      }
    };

    return {
      expenseBreakdown: simulationData?.chartData?.expenseBreakdown || simulationData?.expenseBreakdown || [],
      incomeVsExpenses: simulationData?.chartData?.incomeVsExpenses || simulationData?.incomeVsExpenses || [],
      projections: {
        shortTerm: simulationData?.chartData?.projections?.shortTerm || simulationData?.projections?.shortTerm || {
          timestamps: [],
          actualValues: [],
          recommendedValues: []
        },
        longTerm: simulationData?.chartData?.projections?.longTerm || simulationData?.projections?.longTerm || {
          timestamps: [],
          actualValues: [],
          recommendedValues: []
        }
      }
    };
  }, [simulationData]);

  const recommendations = useMemo(() => simulationData?.recommendations || [], [simulationData]);

  const pastDecisionsImpact = useMemo(() => simulationData?.pastDecisionsImpact || {
    positiveImpacts: [],
    negativeImpacts: [],
    suggestions: []
  }, [simulationData]);

  const financialSnapshot = useMemo(() => {
    // Directly use the financial data coming from backend
    if (simulationData?.financialId) {
      return {
        income: simulationData.financialId.income || 0,
        expenses: simulationData.financialId.expenses || 0,
        monthlySavings: (simulationData.financialId.income || 0) - (simulationData.financialId.expenses.reduce((a, b) => a + b.amount, 0) || 0),
        savings: simulationData.financialId.savings || 0,
        investments: simulationData.financialId.monthlyInvestments || 0
      };
    }

    // Fallback in case financialData isn't available
    const income = simulationData?.chartData?.incomeVsExpenses?.[0]?.amount || 0;
    const expenses = simulationData?.chartData?.incomeVsExpenses?.[1]?.amount || 0;

    return {
      income: income,
      expenses: expenses,
      monthlySavings: income - expenses,
      savings: simulationData?.chartData?.savingsProgress?.[0]?.amount || 0,
      investments: simulationData?.financialId?.monthlyInvestments || 0
    };
  }, [simulationData]);

  const savingsPercentage = useMemo(() => financialSnapshot.income > 0 ?
    Math.round((financialSnapshot.monthlySavings / financialSnapshot.income) * 100) : 0,
    [financialSnapshot]);

  const enhancedDecisionImpact = useMemo(() => {
    if (!financialHistory?.pastDecisionsImpact && !pastDecisionsImpact?.positiveImpacts?.length) {
      return financialHistory?.pastDecisionsImpact || pastDecisionsImpact || {
        positiveImpacts: [],
        negativeImpacts: [],
        suggestions: []
      };
    }

    if (financialHistory?.pastDecisionsImpact) {
      return financialHistory.pastDecisionsImpact;
    }

    return pastDecisionsImpact;
  }, [pastDecisionsImpact, financialHistory]);

  const analysisResultsData = useMemo(() => {
    return financialHistory?.analysisResults || null;
  }, [financialHistory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 text-purple-500 animate-spin mb-4" />
          <p className="text-xl text-gray-300">Loading simulation data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-950 text-white flex items-center justify-center">
        <div className="max-w-lg bg-black/30 backdrop-blur-xl rounded-xl border border-red-800/50 p-8 shadow-lg text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!simulationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-950 text-white flex items-center justify-center">
        <div className="max-w-lg bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8 shadow-lg text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Simulation Found</h2>
          <p className="text-gray-300 mb-6">We couldn't find the simulation you're looking for.</p>
          <button
            onClick={() => navigate('/new-simulation')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium"
          >
            Create New Simulation
          </button>
        </div>
      </div>
    );
  }

  const doughnutData = {
    labels: chartData.expenseBreakdown?.map(item => item?.category) || [],
    datasets: [
      {
        data: chartData.expenseBreakdown?.map(item => item?.amount) || [],
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
          label: function (context) {
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
    labels: chartData.projections[projectionType]?.timestamps?.map(ts =>
      new Date(ts).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    ) || [],
    datasets: [
      {
        label: "Current Path",
        data: chartData.projections[projectionType]?.actualValues || [],
        borderColor: "#8b5cf6",
        backgroundColor: (context) => {
          if (!context?.chart?.ctx) return "rgba(139, 92, 246, 0.2)";
          return createGradient(
            context.chart.ctx,
            "rgba(139, 92, 246, 0.5)",
            "rgba(139, 92, 246, 0)"
          );
        },
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#8b5cf6",
        borderWidth: 3
      },
      {
        label: "Recommended Path",
        data: chartData.projections[projectionType]?.recommendedValues || [],
        borderColor: "#22d3ee",
        backgroundColor: (context) => {
          if (!context?.chart?.ctx) return "rgba(34, 211, 238, 0.2)";
          return createGradient(
            context.chart.ctx,
            "rgba(34, 211, 238, 0.5)",
            "rgba(34, 211, 238, 0)"
          );
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

  const statCards = [
    {
      title: "Monthly Income",
      value: formatter.format(financialSnapshot.income),
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      change: financialSnapshot.income ? "Monthly income" : "No data",
      color: "from-blue-500/20 to-blue-600/20",
      iconBg: "bg-blue-600/20",
      iconText: "text-blue-400"
    },
    {
      title: "Monthly Expenses",
      value: formatter.format(financialSnapshot.expenses.reduce((a, b) => a + b.amount, 0)),
      icon: <BarChart3 className="h-5 w-5 text-red-400" />,
      change: financialSnapshot.expenses ? "Monthly expenses" : "No data",
      color: "from-red-500/20 to-red-600/20",
      iconBg: "bg-red-600/20",
      iconText: "text-red-400"
    },
    {
      title: "Total Savings",
      value: formatter.format(financialSnapshot.savings),
      icon: <PieChartIcon className="h-5 w-5 text-green-400" />,
      change: `Monthly: ${formatter.format(financialSnapshot.monthlySavings)} (${savingsPercentage}%)`,
      color: "from-green-500/20 to-green-600/20",
      iconBg: "bg-green-600/20",
      iconText: "text-green-400"
    },
    {
      title: "Monthly Investments",
      value: formatter.format(financialSnapshot.investments),
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      change: financialSnapshot.investments > 0 ? "Active investments" : "No investments",
      color: "from-purple-500/20 to-purple-600/20",
      iconBg: "bg-purple-600/20",
      iconText: "text-purple-400"
    }
  ];

  const hasExpenseData = chartData.expenseBreakdown?.length > 0;
  const hasProjectionData = (chartData.projections?.[projectionType]?.timestamps?.length > 0 &&
    chartData.projections?.[projectionType]?.actualValues?.length > 0);
  const hasRecommendations = recommendations?.length > 0;
  const hasDecisionImpact = (pastDecisionsImpact?.positiveImpacts?.length > 0 ||
    pastDecisionsImpact?.negativeImpacts?.length > 0);
  const hasFinancialHistory = financialHistory && Object.keys(financialHistory).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-950 text-white p-6">
      <Header title={simulationData?.title || "Financial Dashboard"} />
      {simulationData && <SimulationInfo simulationData={simulationData} />}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} index={index} />
        ))}
      </div>

      {/* Main dashboard grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* First column: Expense breakdown */}
        <div>
          {hasExpenseData ? (
            <ExpenseBreakdownChart
              doughnutData={doughnutData}
              doughnutOptions={doughnutOptions}
              totalExpenses={formatter.format(chartData.expenseBreakdown.reduce((acc, item) => acc + (item?.amount || 0), 0))}
            />
          ) : (
            <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg h-[300px] flex items-center justify-center">
              <p className="text-gray-400">No expense data available</p>
            </div>
          )}
        </div>

        {/* Second column: Savings meter */}
        <div>
          <SavingsMeter
            savingsPercentage={savingsPercentage}
            savingsAmount={financialSnapshot.monthlySavings}
            formatter={formatter}
          />
        </div>

        {/* Third column: AI Recommendations (rowspan 2) */}
        <div className="lg:row-span-2">
          {hasRecommendations ? (
            <AIRecommendations recommendations={recommendations} className="h-full" />
          ) : (
            <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg h-full flex items-center justify-center">
              <p className="text-gray-400">No recommendations available</p>
            </div>
          )}
        </div>

        {/* Fourth and Fifth columns (second row): Financial projections (colspan 2) */}
        <div className="lg:col-span-2">
          {hasProjectionData ? (
            <FinancialProjections
              projectionType={projectionType}
              setProjectionType={setProjectionType}
              lineData={lineData}
              lineOptions={lineOptions}
              projections={chartData.projections}
            />
          ) : (
            <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg h-[350px] flex items-center justify-center">
              <p className="text-gray-400">No projection data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: Decision Impact Analysis (full width) */}
      {(hasDecisionImpact || hasFinancialHistory) ? (
        <DecisionImpactAnalysis
          pastDecisionsImpact={enhancedDecisionImpact}
          analysisResults={analysisResultsData}
        />
      ) : (
        <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg h-[200px] flex items-center justify-center">
          <p className="text-gray-400">No decision impact data available</p>
        </div>
      )}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(simulationData?.updatedAt || simulationData?.createdAt).toLocaleString()} •
          <span className="text-blue-400 cursor-pointer hover:underline ml-1"
            onClick={handleReloadData}>
            Refresh data
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
