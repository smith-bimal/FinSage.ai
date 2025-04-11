import { useState } from "react";
// import { useNavigate } from "react-router";
// import api from "../config/axios.config.js";

function NewSimulation() {
//   const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const getScenarioInputs = () => {
        switch (formData.scenario) {
          case "job":
            return { expectedSalary: Number(formData.expectedSalary) || 0 };
          case "city":
            return {
              newCity: formData.newCity,
              cityDetails: {
                expectedRent: Number(formData.cityDetails.expectedRent) || 0,
                costOfLiving: Number(formData.cityDetails.costOfLiving) || 0,
              },
            };
          case "business":
            return {
              businessInvestment: Number(formData.businessInvestment) || 0,
              businessType: formData.businessType,
            };
          case "asset":
            return {
              assetValue: Number(formData.assetValue) || 0,
              assetType: formData.assetType,
            };
          default:
            return {};
        }
      };

      const simulationData = {
        userId,
        currentState: {
          monthlyIncome: Number(formData.monthlyIncome) || 0,
          expenses: Object.fromEntries(
            Object.entries(formData.expenses).map(([k, v]) => [
              k,
              Number(v) || 0,
            ])
          ),
          savings: Number(formData.currentSavings) || 0,
          investments: Object.fromEntries(
            Object.entries(formData.currentInvestments).map(([k, v]) => [
              k,
              Number(v) || 0,
            ])
          ),
        },
        futureState: {
          scenario: formData.scenario,
          timeline: Number(formData.timeline) || 1,
          inputs: getScenarioInputs(),
        },
      };
      simulationData()
    //   const response = await api.post("/simulations", simulationData);
    //   if (response.data) {
        // navigate("/results", { state: { simulationId: response.data.id } });
    //   }
    } catch (err) {
      console.error("Simulation error:", err.response?.data || err.message);
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
