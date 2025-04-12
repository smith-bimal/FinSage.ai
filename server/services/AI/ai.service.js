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
              "timestamps": [12 monthly dates starting from current month in YYYY-MM-DD format],
              "actualValues": [12 numbers showing projected financial growth with current user spending/saving/investment pattern],
              "recommendedValues": [12 numbers showing projected financial growth with optimized spending/saving/investment allocation]
            },
            "longTerm": {
              "timestamps": [10 yearly dates starting from current year in YYYY-MM-DD format],
              "actualValues": [10 numbers showing projected financial growth with current user spending pattern including compound interest],
              "recommendedValues": [10 numbers showing projected financial growth with optimized strategy including compound interest]
            }
          }
        }
      }

      For the projections:
      - timestamps: Generate appropriate time periods (monthly for short term, yearly for long term)
      - actualValues: Calculate based on the user's CURRENT spending patterns, savings rate, and investment choices
      - recommendedValues: Calculate based on your OPTIMIZED recommendations for spending, savings, and investments

      Short-term projections should show month-by-month growth over the next year.
      Long-term projections should show year-by-year growth over the next decade.
      
      Both should factor in:
      1. Current investment portfolio returns vs optimized portfolio allocation
      2. Current savings rate vs recommended savings rate
      3. Current spending patterns vs optimized spending allocation
      4. Compound growth over time for both scenarios

      Ensure the recommended values show significant improvement over the actual values to demonstrate the value of following the recommendations.
      
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

export async function analyzeBehaviorGemini(userId, simulationId = null) {
  try {
    const financialData = await Financial.findOne({ userId });
    if (!financialData) {
      throw new Error('Financial data not found');
    }

    // Check if a history record already exists for the user and simulation
    const existingHistory = await FinancialHistory.findOne({ userId, simulationId });
    if (existingHistory) {
      return existingHistory; // Return the existing history to avoid duplicates
    }

    // Get historical data for trend analysis
    const spendingTrends = calculateSpendingTrends(financialData.expenses);
    const monthlyIncome = Number(financialData.income) || 0;
    const currentSavings = Number(financialData.savings) || 0;
    const totalInvestments = (financialData.investments || [])
      .reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalExpenses = Object.values(spendingTrends)
      .reduce((sum, exp) => sum + Number(exp), 0);

    // Get historical records for backward analysis
    const historicalRecords = await FinancialHistory.find({ userId })
      .sort({ date: -1 })
      .limit(6); // Get last 6 records for trend analysis

    const prompt = `
      Analyze the user's financial data:
      Monthly Income: ${monthlyIncome}
      Current Savings: ${currentSavings}
      Total Investments: ${totalInvestments}
      Monthly Expenses: ${totalExpenses}
      Expense Breakdown: ${JSON.stringify(spendingTrends)}
      
      Historical Data: ${JSON.stringify(historicalRecords.map(record => ({
      date: record.date,
      data: record.data
    })))}

      Generate analysis matching this structure:
      {
        "behaviorAnalysis": {
          "spendingPatterns": {
            "categories": [{
              "name": string,
              "percentage": number,
              "trend": string
            }]
          },
          "savingsBehavior": {
            "consistency": string,
            "averageSavingsRate": number
          }
        },
        "historicalAnalysis": {
          "trends": [{
            "metric": string,
            "data": [number],
            "insight": string
          }]
        },
        "pastDecisionsImpact": {
          "positiveImpacts": [
            { "decision": string, "impact": string, "financialEffect": string }
          ],
          "negativeImpacts": [
            { "decision": string, "impact": string, "financialEffect": string }
          ],
          "suggestions": [
            { "area": string, "suggestion": string, "potentialBenefit": string }
          ]
        },
        "financialSnapshot": {
          "income": number,
          "expenses": number,
          "savings": number,
          "investments": number
        },
        analysisResults: {
          score: Number,
          strengths: [String],
          weaknesses: [String]
        }
      }
      
      For pastDecisionsImpact:
      1. Identify 2-3 positive financial decisions from the user's spending/saving patterns
      2. Identify 2-3 negative financial decisions or missed opportunities
      3. Provide actionable suggestions based on these past decisions
      4. Quantify the financial effect whenever possible (e.g., "saved approximately $500" or "missed potential gains of $1,000")`;

    const response = await generateAIContent(prompt);
    const analysis = JSON.parse(response.replace("```json", "").replace("```", ""));

    // Create financial history record with all required fields
    const newHistory = await FinancialHistory.create({
      userId,
      simulationId,
      isComplete: true,
      pastDecisionsImpact: analysis.pastDecisionsImpact,
      behaviorAnalysis: analysis.behaviorAnalysis,
      financialSnapshot: analysis.financialSnapshot,
      analysisResults: analysis.analysisResults
    });

    return newHistory;
  } catch (error) {
    console.error('Behavior Analysis Error:', error);
    // Return a basic structure to prevent errors
    return {
      behaviorAnalysis: {
        spendingPatterns: {
          categories: [{ name: 'Miscellaneous', percentage: 100, trend: 'stable' }]
        },
        savingsBehavior: {
          consistency: 'moderate',
          averageSavingsRate: 0
        }
      },
      historicalAnalysis: {
        trends: []
      },
      pastDecisionsImpact: {
        positiveImpacts: [],
        negativeImpacts: [],
        suggestions: []
      },
      financialSnapshot: {
        income: 0,
        expenses: 0,
        savings: 0,
        investments: 0
      }
    };
  }
}