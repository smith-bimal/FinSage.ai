import { useState } from "react";
import { useNavigate } from "react-router";
import { financialService } from "../services/financial.service.js";
import { simulationService } from "../services/simulation.service.js";
import { toast } from "react-hot-toast";

function NewSimulation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    currentSavings: "",
    expenses: {
      food: "",
      rent: "",
      shopping: "",
      utilities: "",
      transportation: "",
      entertainment: "",
      others: "",
    },

    currentInvestments: {
      stocks: "",
      mutualFunds: "",
      fixedDeposits: "",
      others: "",
    },
    personalDetails: {
      Age: "",
      Occupation: "",
      CurrentCity: "",
      FamilySize: "",
    },
    scenario: "job",
    expectedSalary: "",
    newCity: "",
    cityDetails: {
      expectedRent: "",
      costOfLiving: "",
    },
    businessInvestment: "",
    businessType: "",
    assetValue: "",
    assetType: "",
    timeline: "1",
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        toast.error("Please login to create a simulation");
        navigate("/login");
        return;
      }

      // First create/update financial data
      const financialData = {
        income: Number(formData.monthlyIncome) || 0,
        savings: Number(formData.currentSavings) || 0,
        expenses: Object.entries(formData.expenses)
          .filter(([_, value]) => value.trim() !== '')
          .map(([category, amount]) => ({
            category,
            amount: Number(amount),
            frequency: 'monthly',
            date: new Date()
          })),
        investments: Object.entries(formData.currentInvestments)
          .filter(([_, value]) => value.trim() !== '')
          .map(([type, amount]) => ({
            type,
            amount: Number(amount),
            returnRate: type === 'stocks' ? 12 : type === 'mutualFunds' ? 10 : type === 'fixedDeposits' ? 7 : 8,
            startDate: new Date()
          }))
      };

      await financialService.updateFinancialData(userId, financialData);

      // Prepare scenario details based on selected scenario
      let details = {};
      switch (formData.scenario) {
        case 'job':
          details = { newSalary: Number(formData.expectedSalary) || 0 };
          break;
        case 'investment':
          details = {
            investmentAmount: Number(formData.businessInvestment) || 0,
            annualReturnRate: 10 // Default return rate
          };
          break;
        case 'purchase':
          details = { purchaseCost: Number(formData.assetValue) || 0 };
          break;
        case 'city':
          // This is handled as a custom scenario
          details = {
            newCity: formData.newCity,
            expectedRent: Number(formData.cityDetails.expectedRent) || 0,
            costOfLiving: Number(formData.cityDetails.costOfLiving) || 0
          };
          break;
        case 'business':
          // This is handled as a custom scenario
          details = {
            investment: Number(formData.businessInvestment) || 0,
            type: formData.businessType
          };
          break;
        case 'asset':
          // This is handled as a purchase scenario in the backend
          details = {
            purchaseCost: Number(formData.assetValue) || 0,
            assetType: formData.assetType
          };
          break;
        default:
          break;
      }

      // Now create the simulation
      const simulationData = {
        futureState: [{
          type: formData.scenario,
          timeline: Number(formData.timeline) * 12, // Convert years to months
          details
        }]
      };

      const response = await simulationService.createSimulation(userId, simulationData);
      
      toast.success("Simulation created successfully!");
      navigate("/results", { state: { simulationId: response._id } });
    } catch (err) {
      console.error("Simulation error:", err);
      toast.error(err.message || "Failed to create simulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between text-gray-400">
          <span className={step === 1 ? "text-white font-semibold" : ""}>
            Current Financial Life
          </span>
          <span className={step === 2 ? "text-white font-semibold" : ""}>
            Future Changes
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white text-center">
          {step === 1 ? "Your Current Financial Life" : "Future Changes"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <div className="bg-gradient-to-br from-gray-800/50 to-black/40 p-6 rounded-xl shadow-md space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-1">
                  Monthly Income
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                  value={formData.monthlyIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyIncome: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-1">
                  Current Savings
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                  value={formData.currentSavings}
                  onChange={(e) =>
                    setFormData({ ...formData, currentSavings: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-indigo-400 text-lg font-semibold">
                  Monthly Expenses
                </h3>
                {Object.keys(formData.expenses).map((expense) => (
                  <div key={expense}>
                    <label className="block text-sm text-gray-400 capitalize mb-1">
                      {expense}
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.expenses[expense]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expenses: {
                            ...formData.expenses,
                            [expense]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-indigo-400 text-lg font-semibold">
                  Current Investments
                </h3>
                {Object.keys(formData.currentInvestments).map((investment) => (
                  <div key={investment}>
                    <label className="block text-sm text-gray-400 capitalize mb-1">
                      {investment}
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.currentInvestments[investment]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentInvestments: {
                            ...formData.currentInvestments,
                            [investment]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-indigo-400 text-lg font-semibold">
                  Personal Details
                </h3>
                {Object.keys(formData.personalDetails).map((details) => (
                  <div key={details}>
                    <label className="block text-sm text-gray-400 capitalize mb-1">
                      {details}
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.personalDetails[details]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: {
                            ...formData.personalDetails,
                            [details]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 mt-6"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-800/50 to-black/40  p-6 rounded-xl shadow-md space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-1">
                  Choose Scenario
                </label>
                <select
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                  value={formData.scenario}
                  onChange={(e) =>
                    setFormData({ ...formData, scenario: e.target.value })
                  }
                >
                  <option value="job">Change Jobs</option>
                  <option value="city">Move to New City</option>
                  <option value="business">Start Business</option>
                  <option value="asset">Buy Asset (Car/House)</option>
                </select>
              </div>

              {/* Conditional fields */}
              {formData.scenario === "job" && (
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-1">
                    Expected New Salary
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                    value={formData.expectedSalary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectedSalary: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {formData.scenario === "city" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      New City
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.newCity}
                      onChange={(e) =>
                        setFormData({ ...formData, newCity: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      Expected Rent
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.cityDetails.expectedRent}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cityDetails: {
                            ...formData.cityDetails,
                            expectedRent: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      Cost of Living
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.cityDetails.costOfLiving}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cityDetails: {
                            ...formData.cityDetails,
                            costOfLiving: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {formData.scenario === "business" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      Business Investment
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.businessInvestment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessInvestment: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      Business Type
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.businessType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessType: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {formData.scenario === "asset" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      Asset Value
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.assetValue}
                      onChange={(e) =>
                        setFormData({ ...formData, assetValue: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">
                      Asset Type
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                      value={formData.assetType}
                      onChange={(e) =>
                        setFormData({ ...formData, assetType: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-1">
                  Timeline
                </label>
                <select
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/70 p-2 text-white shadow-inner shadow-black/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:outline-none transition duration-200"
                  value={formData.timeline}
                  onChange={(e) =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                >
                  <option value="1">1 Year</option>
                  <option value="5">5 Years</option>
                  <option value="10">10 Years</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Create Simulation
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewSimulation;
