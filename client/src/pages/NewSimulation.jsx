import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../config/axios.config.js';

function NewSimulation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Current Life (Step 2)
    monthlyIncome: '',
    expenses: {
      food: '',
      rent: '',
      shopping: '',
      utilities: '',
      transportation: '',
      entertainment: '',
      others: ''
    },
    currentSavings: '',
    currentInvestments: {
      stocks: '',
      mutualFunds: '',
      fixedDeposits: '',
      others: ''
    },

    // Future Changes (Step 3)
    scenario: 'job',
    expectedSalary: '',
    newCity: '',
    cityDetails: {
      expectedRent: '',
      costOfLiving: ''
    },
    businessInvestment: '',
    businessType: '',
    assetValue: '',
    assetType: '',
    timeline: '1' // 1, 5, or 10 years
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const getScenarioInputs = () => {
        switch (formData.scenario) {
          case 'job':
            return {
              expectedSalary: Number(formData.expectedSalary) || 0
            };
          case 'city':
            return {
              newCity: formData.newCity,
              cityDetails: {
                expectedRent: Number(formData.cityDetails.expectedRent) || 0,
                costOfLiving: Number(formData.cityDetails.costOfLiving) || 0
              }
            };
          case 'business':
            return {
              businessInvestment: Number(formData.businessInvestment) || 0,
              businessType: formData.businessType
            };
          case 'asset':
            return {
              assetValue: Number(formData.assetValue) || 0,
              assetType: formData.assetType
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
            Object.entries(formData.expenses).map(([k, v]) => [k, Number(v) || 0])
          ),
          savings: Number(formData.currentSavings) || 0,
          investments: Object.fromEntries(
            Object.entries(formData.currentInvestments).map(([k, v]) => [k, Number(v) || 0])
          )
        },
        futureState: {
          scenario: formData.scenario,
          timeline: Number(formData.timeline) || 1,
          inputs: getScenarioInputs()
        }
      };

      const response = await api.post('/simulations', simulationData);
      if (response.data) {
        navigate('/results', { state: { simulationId: response.data.id } });
      }
    } catch (err) {
      console.error('Simulation error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress indicator */}
        <div className="flex justify-between text-gray-400">
          <span className={step === 1 ? 'text-white' : ''}>Current Financial Life</span>
          <span className={step === 2 ? 'text-white' : ''}>Future Changes</span>
        </div>

        <h1 className="text-3xl font-bold text-white text-center">
          {step === 1 ? 'Your Current Financial Life' : 'Future Changes'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            // Step 1: Current Life
            <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              <div>
                <label className="text-gray-300">Monthly Income</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({
                    ...formData,
                    monthlyIncome: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-300">Monthly Expenses</h3>
                {Object.keys(formData.expenses).map(expense => (
                  <div key={expense}>
                    <label className="text-gray-400 capitalize">{expense}</label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                      value={formData.expenses[expense]}
                      onChange={(e) => setFormData({
                        ...formData,
                        expenses: {
                          ...formData.expenses,
                          [expense]: e.target.value
                        }
                      })}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-gray-300">Current Savings/Investments</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                  value={formData.currentSavings}
                  onChange={(e) => setFormData({
                    ...formData,
                    currentSavings: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-300">Current Investments</h3>
                {Object.keys(formData.currentInvestments).map(investment => (
                  <div key={investment}>
                    <label className="text-gray-400 capitalize">{investment}</label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                      value={formData.currentInvestments[investment]}
                      onChange={(e) => setFormData({
                        ...formData,
                        currentInvestments: {
                          ...formData.currentInvestments,
                          [investment]: e.target.value
                        }
                      })}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
              >
                Next: Future Changes
              </button>
            </div>
          ) : (
            // Step 2: Future Changes
            <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              <div>
                <label className="text-gray-300">Choose Scenario</label>
                <select
                  className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                  value={formData.scenario}
                  onChange={(e) => setFormData({
                    ...formData,
                    scenario: e.target.value
                  })}
                >
                  <option value="job">Change Jobs</option>
                  <option value="city">Move to New City</option>
                  <option value="business">Start Business</option>
                  <option value="asset">Buy Asset (Car/House)</option>
                </select>
              </div>

              {/* Dynamic fields based on scenario */}
              {formData.scenario === 'job' && (
                <div>
                  <label className="text-gray-300">Expected New Salary</label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({
                      ...formData,
                      expectedSalary: e.target.value
                    })}
                  />
                </div>
              )}

              {formData.scenario === 'city' && (
                <div>
                  <label className="text-gray-300">New City</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                    value={formData.newCity}
                    onChange={(e) => setFormData({
                      ...formData,
                      newCity: e.target.value
                    })}
                  />
                  <div>
                    <label className="text-gray-300">Expected Rent</label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 text-white rounded p-2 mt-1"
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
                  <div>
                    <label className="text-gray-300">Cost of Living</label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 text-white rounded p-2 mt-1"
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
              )}

              {formData.scenario === 'business' && (
                <div>
                  <label className="text-gray-300">Business Investment</label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                    value={formData.businessInvestment}
                    onChange={(e) => setFormData({
                      ...formData,
                      businessInvestment: e.target.value
                    })}
                  />
                  <div>
                    <label className="text-gray-300">Business Type</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                      value={formData.businessType}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessType: e.target.value
                      })}
                    />
                  </div>
                </div>
              )}

              {formData.scenario === 'asset' && (
                <div>
                  <label className="text-gray-300">Asset Value</label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                    value={formData.assetValue}
                    onChange={(e) => setFormData({
                      ...formData,
                      assetValue: e.target.value
                    })}
                  />
                  <div>
                    <label className="text-gray-300">Asset Type</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                      value={formData.assetType}
                      onChange={(e) => setFormData({
                        ...formData,
                        assetType: e.target.value
                      })}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-gray-300">Timeline</label>
                <select
                  className="w-full bg-gray-700 text-white rounded p-2 mt-1"
                  value={formData.timeline}
                  onChange={(e) => setFormData({
                    ...formData,
                    timeline: e.target.value
                  })}
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
                  className="w-1/2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
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
