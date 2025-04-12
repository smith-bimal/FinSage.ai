/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, DollarSign, Briefcase, Home, MapPin, TrendingUp, ShoppingBag, Plus, ChevronLeft } from 'lucide-react';
import { financialService } from "../services/financial.service.js";
import { simulationService } from "../services/simulation.service.js";

function NewSimulation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({

    income: '',
    savings: '',
    expenses: [
      { category: 'food', amount: '', frequency: 'monthly', date: new Date() },
      { category: 'rent', amount: '', frequency: 'monthly', date: new Date() },
      { category: 'shopping', amount: '', frequency: 'monthly', date: new Date() },
      { category: 'utilities', amount: '', frequency: 'monthly', date: new Date() },
      { category: 'transportation', amount: '', frequency: 'monthly', date: new Date() },
      { category: 'entertainment', amount: '', frequency: 'monthly', date: new Date() },
      { category: 'others', amount: '', frequency: 'monthly', date: new Date() }
    ],
    investments: [
      { type: 'stocks', amount: '', returnRate: 12, startDate: new Date() },
      { type: 'mutualFunds', amount: '', returnRate: 10, startDate: new Date() },
      { type: 'fixedDeposits', amount: '', returnRate: 7, startDate: new Date() },
      { type: 'others', amount: '', returnRate: 8, startDate: new Date() }
    ],
    assets: [
      { name: '', value: '', purchaseDate: new Date() },
      { name: 'Home', value: '', purchaseDate: new Date() }
    ],


    scenario: 'job',
    timeline: '12',


    newSalary: '',


    investmentAmount: '',
    annualReturnRate: '10',


    purchaseCost: '',


    newCity: '',
    cityDetails: {
      expectedRent: '',
      costOfLiving: ''
    },


    businessInvestment: '',
    businessType: '',


    assetValue: '',
    assetType: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true); // Set loading state to true when submission starts
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        console.error("Please login to create a simulation");
        navigate("/login");
        return;
      }
  
      // Log that simulation is being created instead of showing toast
      console.info("Creating your financial simulation...");
  
      const financialData = {
        income: Number(formData.income) || 0,
        savings: Number(formData.savings) || 0,
        expenses: formData.expenses
          .filter(expense => expense.amount.trim() !== '')
          .map(expense => ({
            category: expense.category,
            amount: Number(expense.amount),
            frequency: expense.frequency,
            date: expense.date
          })),
        investments: formData.investments
          .filter(investment => investment.amount.trim() !== '')
          .map(investment => ({
            type: investment.type,
            amount: Number(investment.amount),
            returnRate: Number(investment.returnRate),
            startDate: investment.startDate
          })),
        assets: formData.assets
          .filter(asset => asset.name.trim() !== '' && asset.value.trim() !== '')
          .map(asset => ({
            name: asset.name,
            value: Number(asset.value),
            purchaseDate: asset.purchaseDate
          }))
      };
  
      await financialService.updateFinancialData(userId, financialData);
  
  
      let details = {};
      switch (formData.scenario) {
        case 'job':
          details = { newSalary: Number(formData.newSalary) || 0 };
          break;
        case 'investment':
          details = {
            investmentAmount: Number(formData.investmentAmount) || 0,
            annualReturnRate: Number(formData.annualReturnRate) || 10
          };
          break;
        case 'purchase':
          details = { purchaseCost: Number(formData.purchaseCost) || 0 };
          break;
        case 'city':
          details = {
            newCity: formData.newCity,
            expectedRent: Number(formData.cityDetails.expectedRent) || 0,
            costOfLiving: Number(formData.cityDetails.costOfLiving) || 0
          };
          break;
        case 'business':
          details = {
            investment: Number(formData.businessInvestment) || 0,
            type: formData.businessType
          };
          break;
        case 'asset':
          details = {
            purchaseCost: Number(formData.assetValue) || 0,
            assetType: formData.assetType
          };
          break;
        default:
          break;
      }
  
  
      const simulationData = {
        futureState: [{
          type: formData.scenario,
          timeline: Number(formData.timeline) || 12,
          details
        }]
      };
  
      const response = await simulationService.createSimulation(userId, simulationData);
  
      console.log("Simulation created successfully!");
      navigate("/results", { state: { simulationId: response._id } });
    } catch (err) {
      console.error("Simulation error:", err);
      // Replace toast.error with console.error
      console.error(err.message || "Failed to create simulation");
    } finally {
      setLoading(false); // Always reset loading state when done
    }
  };


  const updateExpense = (index, field, value) => {
    const updatedExpenses = [...formData.expenses];
    updatedExpenses[index] = {
      ...updatedExpenses[index],
      [field]: value
    };
    setFormData({
      ...formData,
      expenses: updatedExpenses
    });
  };


  const updateInvestment = (index, field, value) => {
    const updatedInvestments = [...formData.investments];
    updatedInvestments[index] = {
      ...updatedInvestments[index],
      [field]: value
    };
    setFormData({
      ...formData,
      investments: updatedInvestments
    });
  };


  const updateAsset = (index, field, value) => {
    const updatedAssets = [...formData.assets];
    updatedAssets[index] = {
      ...updatedAssets[index],
      [field]: value
    };
    setFormData({
      ...formData,
      assets: updatedAssets
    });
  };


  const addAsset = () => {
    setFormData({
      ...formData,
      assets: [
        ...formData.assets,
        { name: '', value: '', purchaseDate: new Date() }
      ]
    });
  };


  const scenarioIcons = {
    job: <Briefcase className="h-6 w-6" />,
    investment: <TrendingUp className="h-6 w-6" />,
    purchase: <ShoppingBag className="h-6 w-6" />,
    city: <MapPin className="h-6 w-6" />,
    business: <DollarSign className="h-6 w-6" />,
    asset: <Home className="h-6 w-6" />
  };


  const getStepTitle = () => {
    if (step === 1) return "Your Current Financial Profile";
    if (step === 2) return "Explore Your Financial Future";
    return "";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-950 to-gray-950 p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <span className="text-white text-xl font-extrabold">
              Fin<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Sage.ai</span>
            </span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 relative">
          <div className="w-full h-1 bg-gray-800 absolute top-5"></div>
          <div
            className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 absolute top-5 transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>

          <div className="flex justify-between relative z-10">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${step === stepNumber
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-400'
                    }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`mt-2 text-sm ${step === stepNumber ? 'text-white' : 'text-gray-400'
                    }`}
                >
                  {stepNumber === 1 ? 'Current Financial Life' : 'Future Changes'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Header */}
        <motion.div
          className="text-center mb-8"
          key={step}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {getStepTitle()}
          </h1>
          <p className="text-gray-400 mt-2">
            {step === 1 ?
              "Let's understand your current financial position to create accurate projections." :
              "Simulate different financial scenarios to visualize their impact on your future."}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-black/20 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50 overflow-hidden p-6 md:p-8"
          >
            {step === 1 ? (

              <div className="space-y-6">
                {/* Income Section */}
                <div className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-800/50">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-600/20 rounded-lg mr-3">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-white text-lg font-semibold">Monthly Income & Savings</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="text-sm text-gray-400 mb-1 block">Monthly Income</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                        value={formData.income}
                        onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                      />
                      <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                    </div>

                    <div className="relative group">
                      <label className="text-sm text-gray-400 mb-1 block">Current Savings</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                        value={formData.savings}
                        onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                      />
                      <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Expenses Section */}
                <div className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-800/50">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg mr-3">
                      <ShoppingBag className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-white text-lg font-semibold">Monthly Expenses</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.expenses.map((expense, index) => (
                      <div key={index} className="relative group">
                        <label className="text-sm text-gray-400 mb-1 block capitalize">{expense.category}</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                          value={expense.amount}
                          onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                        />
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investments Section */}
                <div className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-800/50">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-600/20 rounded-lg mr-3">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-white text-lg font-semibold">Current Investments</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.investments.map((investment, index) => (
                      <div key={index} className="relative group">
                        <label className="text-sm text-gray-400 mb-1 block capitalize">{investment.type}</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                          value={investment.amount}
                          onChange={(e) => updateInvestment(index, 'amount', e.target.value)}
                        />
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assets Section */}
                <div className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-800/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-600/20 rounded-lg mr-3">
                        <Home className="h-5 w-5 text-yellow-400" />
                      </div>
                      <h3 className="text-white text-lg font-semibold">Assets</h3>
                    </div>
                    <button
                      type="button"
                      onClick={addAsset}
                      className="flex items-center bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Asset
                    </button>
                  </div>

                  <div className="space-y-6">
                    {formData.assets.map((asset, index) => (
                      <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <label className="text-sm text-gray-400 mb-1 block">Asset Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Car, House, Gold"
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={asset.name}
                              onChange={(e) => updateAsset(index, 'name', e.target.value)}
                            />
                            <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 group-focus-within:w-full transition-all duration-300"></div>
                          </div>

                          <div className="relative group">
                            <label className="text-sm text-gray-400 mb-1 block">Value</label>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={asset.value}
                              onChange={(e) => updateAsset(index, 'value', e.target.value)}
                            />
                            <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 group-focus-within:w-full transition-all duration-300"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold flex items-center justify-center group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Continue to Future Changes
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            ) : (

              <div className="space-y-6">
                {/* Scenario Selection */}
                <div className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-800/50">
                  <h3 className="text-white text-lg font-semibold mb-4">Choose Your Financial Scenario</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { value: 'job', label: 'Change Jobs', color: 'from-blue-500 to-indigo-500' },
                      { value: 'investment', label: 'Make Investment', color: 'from-green-500 to-emerald-500' },
                      { value: 'purchase', label: 'Major Purchase', color: 'from-red-500 to-pink-500' },
                      { value: 'city', label: 'Move to New City', color: 'from-purple-500 to-violet-500' },
                      { value: 'business', label: 'Start Business', color: 'from-amber-500 to-orange-500' },
                      { value: 'asset', label: 'Buy Asset', color: 'from-cyan-500 to-blue-500' }
                    ].map(scenario => (
                      <motion.div
                        key={scenario.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, scenario: scenario.value })}
                        className={`cursor-pointer rounded-xl border ${formData.scenario === scenario.value ?
                          `bg-gradient-to-br ${scenario.color} border-transparent` :
                          'bg-gray-800/70 border-gray-700 hover:border-gray-600'
                          } p-4 flex flex-col items-center justify-center transition-all`}
                      >
                        <div className={`p-2 rounded-lg ${formData.scenario === scenario.value ? 'bg-white/20' : 'bg-gray-700'} mb-2`}>
                          {scenarioIcons[scenario.value]}
                        </div>
                        <span className={`text-sm font-medium ${formData.scenario === scenario.value ? 'text-white' : 'text-gray-300'}`}>
                          {scenario.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Scenario Fields */}
                <div className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-800/50">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg mr-3">
                      {scenarioIcons[formData.scenario]}
                    </div>
                    <h3 className="text-white text-lg font-semibold capitalize">
                      {formData.scenario === 'job' ? 'New Job Details' :
                        formData.scenario === 'investment' ? 'Investment Details' :
                          formData.scenario === 'purchase' ? 'Purchase Details' :
                            formData.scenario === 'city' ? 'Relocation Details' :
                              formData.scenario === 'business' ? 'Business Details' :
                                'Asset Purchase Details'}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Job Details */}
                    {formData.scenario === 'job' && (
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Expected New Monthly Salary</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={formData.newSalary}
                              onChange={(e) => setFormData({ ...formData, newSalary: e.target.value })}
                            />
                          </div>
                          <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-focus-within:w-full transition-all duration-300"></div>
                          <p className="text-xs text-gray-500 mt-1">Enter your expected monthly salary after taxes</p>
                        </div>
                      </div>
                    )}

                    {/* Investment Details */}
                    {formData.scenario === 'investment' && (
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Investment Amount</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={formData.investmentAmount}
                              onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Expected Annual Return Rate</label>
                          <div className="relative">
                            <input
                              type="number"
                              placeholder="10"
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={formData.annualReturnRate}
                              onChange={(e) => setFormData({ ...formData, annualReturnRate: e.target.value })}
                            />
                            <span className="absolute right-4 top-3.5 text-gray-400">%</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Average market returns: 7-12% for stocks, 3-5% for bonds</p>
                        </div>
                      </div>
                    )}

                    {/* Purchase Details */}
                    {formData.scenario === 'purchase' && (
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Purchase Cost</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={formData.purchaseCost}
                              onChange={(e) => setFormData({ ...formData, purchaseCost: e.target.value })}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">The total cost of your planned purchase</p>
                        </div>
                      </div>
                    )}

                    {/* City Details */}
                    {formData.scenario === 'city' && (
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">New City</label>
                          <input
                            type="text"
                            placeholder="e.g. Mumbai, Bangalore"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                            value={formData.newCity}
                            onChange={(e) => setFormData({ ...formData, newCity: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <label className="text-sm text-gray-400 mb-1 block">Expected Monthly Rent</label>
                            <div className="relative">
                              <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                              <input
                                type="number"
                                placeholder="0.00"
                                className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                                value={formData.cityDetails.expectedRent}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  cityDetails: {
                                    ...formData.cityDetails,
                                    expectedRent: e.target.value
                                  }
                                })}
                              />
                            </div>
                          </div>

                          <div className="relative group">
                            <label className="text-sm text-gray-400 mb-1 block">Monthly Cost of Living</label>
                            <div className="relative">
                              <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                              <input
                                type="number"
                                placeholder="0.00"
                                className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                                value={formData.cityDetails.costOfLiving}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  cityDetails: {
                                    ...formData.cityDetails,
                                    costOfLiving: e.target.value
                                  }
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Business Details */}
                    {formData.scenario === 'business' && (
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Initial Investment</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={formData.businessInvestment}
                              onChange={(e) => setFormData({ ...formData, businessInvestment: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Business Type</label>
                          <input
                            type="text"
                            placeholder="e.g. Restaurant, E-commerce, Consulting"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    {/* Asset Details */}
                    {formData.scenario === 'asset' && (
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Asset Value</label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full px-4 py-3 pl-8 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                              value={formData.assetValue}
                              onChange={(e) => setFormData({ ...formData, assetValue: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="text-sm text-gray-400 mb-1 block">Asset Type</label>
                          <select
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white outline-none transition-colors appearance-none"
                            value={formData.assetType}
                            onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                          >
                            <option value="" disabled>Select an asset type</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="property">Property</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="other">Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timeline selector */}
                    <div className="relative group mt-6">
                      <label className="text-sm text-gray-400 mb-1 block">Simulation Timeline</label>
                      <select
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg text-white outline-none transition-colors appearance-none"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      >
                        <option value="12">1 Year (12 months)</option>
                        <option value="60">5 Years (60 months)</option>
                        <option value="120">10 Years (120 months)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 py-3 px-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white font-semibold flex items-center justify-center"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="w-1/2 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold flex items-center justify-center"
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.99 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Simulation...</span>
                      </div>
                    ) : (
                      <>
                        Create Simulation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default NewSimulation;
