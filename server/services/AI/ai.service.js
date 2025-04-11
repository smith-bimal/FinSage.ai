import { config } from 'dotenv';
config("../../.env");
import { Financial } from '../../models/financial.model.js';
import Simulation from '../../models/simulation.model.js';
import { FinancialHistory } from '../../models/financial.history.model.js';
import { calculateSpendingTrends } from '../../utils/behavior.helper.js';
import { generateAIContent } from '../../helpers/gemini.helper.js';

export async function generateGeminiRecommendations(userId) {
  try {
    const financialData = await Financial.findOne({ userId });
    if (!financialData) {
      throw new Error('Financial data not found');
    }

    const spendingTrends = calculateSpendingTrends(financialData.expenses);
    const monthlyIncome = Number(financialData.income) || 0;
    const currentSavings = Number(financialData.savings) || 0;
    
    // Add investment calculations
    const investments = financialData.investments || [];
    const totalInvestments = investments.reduce((total, inv) => total + Number(inv.amount), 0);
    const investmentReturns = investments.map(inv => ({
      type: inv.type,
      amount: Number(inv.amount),
      expectedReturn: getExpectedReturn(inv.type)
    }));

    const prompt = `
      Given the following financial data:
      Monthly Income: ${monthlyIncome}
      Current Savings: ${currentSavings}
      Expenses: ${JSON.stringify(spendingTrends)}
      Current Investments: ${JSON.stringify(investmentReturns)}
      Total Investment Value: ${totalInvestments}

      Consider these investment return rates:
      - Stocks: 12% annual return
      - Mutual Funds: 10% annual return
      - Fixed Deposits: 7% annual return
      - Others: 8% annual return

      Generate a comprehensive financial analysis in this exact JSON structure:
      {
        "recommendations": [{
          "category": "Expense Optimization" | "Investment Strategy" | "Savings Targets" | "Risk Management" | "Future Financial Planning",
          "action": string,
          "rationale": string,
          "confidenceScore": number between 0-100,
          "potentialImpact": {
            "monthly": number,
            "yearly": number
          }
        }],
        "behaviorAnalysis": {
          "spendingPatterns": {
            "categories": [{
              "name": string,
              "monthlyAverage": number,
              "trend": string
            }]
          },
          "savingsBehavior": {
            "consistency": string,
            "averageSavingsRate": number,
            "incomeVsExpenses": {
              "monthlyIncome": number,
              "totalMonthlyExpenses": number,
              "savingsPotential": number
            }
          }
        },
        "chartData": {
          "expenseBreakdown": [{
            "category": string,
            "amount": number
          }],
          "incomeVsExpenses": [{
            "label": string,
            "amount": number
          }],
          "savingsProgress": [{
            "month": string in YYYY-MM-DD format,
            "amount": number
          }],
          "projections": {
            "shortTerm": {
              "timestamps": array of 12 strings in YYYY-MM-DD format,
              "actualValues": array of 12 numbers (include both savings and investment returns),
              "recommendedValues": array of 12 numbers (suggest optimal saving and investment allocation)
            },
            "longTerm": {
              "timestamps": array of 10 strings in YYYY-MM-DD format,
              "actualValues": array of 10 numbers (include compound growth from investments),
              "recommendedValues": array of 10 numbers (show potential with optimized investment strategy)
            }
          }
        }
      }

      Ensure projections factor in:
      1. Current investment portfolio returns
      2. Compound growth over time
      3. Risk-adjusted returns
      4. Optimal investment allocation
      
      Follow the schema structure precisely while incorporating investment growth calculations.`;

    const response = await generateAIContent(prompt);
    return JSON.parse(response.replace("```json", "").replace("```", ""));
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    throw new Error('Failed to generate AI recommendations');
  }
}

// Helper function to get expected return rates
function getExpectedReturn(investmentType) {
  const returnRates = {
    stocks: 0.12,
    mutualFunds: 0.10,
    fixedDeposits: 0.07,
    others: 0.08
  };
  return returnRates[investmentType.toLowerCase()] || returnRates.others;
}

export async function analyzeBehaviorGemini(userId) {
  try {
    const financialData = await Financial.findOne({ userId });
    if (!financialData) {
      throw new Error('Financial data not found');
    }

    const spendingTrends = calculateSpendingTrends(financialData.expenses);
    const monthlyIncome = Number(financialData.income) || 0;
    const currentSavings = Number(financialData.savings) || 0;
    const totalInvestments = (financialData.investments || [])
      .reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalExpenses = Object.values(spendingTrends)
      .reduce((sum, exp) => sum + Number(exp), 0);

    // Ensure a simulation exists
    let simulation = await Simulation.findOne({ userId }).sort({ createdAt: -1 });
    if (!simulation) {
      simulation = new Simulation({
        userId,
        recommendations: [], // Initialize with empty recommendations
        behaviorAnalysis: {}, // Initialize with empty behavior analysis
        chartData: {} // Initialize with empty chart data
      });
      await simulation.save();
    }

    const prompt = `
      Analyze the user's financial data:
      Monthly Income: ${monthlyIncome}
      Current Savings: ${currentSavings}
      Total Investments: ${totalInvestments}
      Monthly Expenses: ${totalExpenses}
      Expense Breakdown: ${JSON.stringify(spendingTrends)}

      Generate analysis matching this structure:
      {
        "behaviorData": {
          "spendingPatterns": {
            "categories": [{
              "name": string,
              "monthlyAverage": number,
              "trend": string
            }]
          },
          "savingsBehavior": {
            "consistency": string,
            "averageSavingsRate": number
          }
        },
        "financialSnapshot": {
          "income": number,
          "expenses": number,
          "savings": number,
          "investments": number
        },
        "analysisResults": {
          "score": number (0-100),
          "strengths": [string],
          "weaknesses": [string]
        }
      }`;

    const response = await generateAIContent(prompt);
    const analysis = JSON.parse(response.replace("```json", "").replace("```", ""));

    // Store in financial history
    await FinancialHistory.create({
      userId,
      simulationId: simulation._id, // Use the simulation ID
      ...analysis
    });

    return analysis;
  } catch (error) {
    console.error('Behavior Analysis Error:', error);
    throw new Error(`Failed to analyze behavior: ${error.message}`);
  }
}

async function updateFinancialHistory(userId, simulationId, updates) {
  await FinancialHistory.findOneAndUpdate(
    { userId, simulationId },
    {
      $set: updates
    },
    { new: true, upsert: true }
  );
}