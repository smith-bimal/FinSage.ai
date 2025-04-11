import { GoogleGenAI } from '@google/genai';
import { Financial } from '../../models/financial.model.js';
import Simulation from '../../models/simulation.model.js';
import { calculateSpendingTrends } from '../../utils/behavior.helper.js';
import { analyzeInvestmentScenario, analyzeJobScenario, analyzePurchaseScenario } from '../../utils/scenario.helper.js';

// Initialize Google GenAI with safety settings
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class AIService {
    static async generateRecommendations(userId) {
        try {
            const financialData = await Financial.findOne({ userId });
            if (!financialData) {
                throw new Error('Financial data not found');
            }

            const totalExpenses = financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const savingsRate = ((financialData.income - totalExpenses) / financialData.income * 100).toFixed(2);

            const prompt = `
                As an expert financial advisor, analyze this financial profile:
                
                Monthly Income: ₹${financialData.income.toLocaleString('en-IN')}
                Total Monthly Expenses: ₹${totalExpenses.toLocaleString('en-IN')}
                Current Savings: ₹${financialData.savings.toLocaleString('en-IN')}
                Savings Rate: ${savingsRate}%
                Expense Breakdown: ${JSON.stringify(financialData.expenses, null, 2)}
                Investments: ${JSON.stringify(financialData.investments, null, 2)}

                Provide 5 specific, actionable recommendations addressing:
                1. Expense optimization
                2. Investment strategy
                3. Savings targets
                4. Risk management
                5. Future financial planning

                Include confidence scores for each recommendation.
            `;

            const response = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
            });

            console.log(response);

            const recommendations = response.text;

            return recommendations;
        } catch (error) {
            console.error('AI Recommendation Error:', error);
            throw new Error(`Failed to generate recommendations: ${error.message}`);
        }
    }

    static async analyzeBehavior(userId) {
        try {
            const financialData = await Financial.findOne({ userId });
            if (!financialData) {
                throw new Error('Financial data not found');
            }

            // Calculate spending trends
            const spendingTrends = calculateSpendingTrends(financialData.expenses);

            // Generate AI-powered insights
            const prompt = `
                Analyze these spending patterns:
                ${JSON.stringify(spendingTrends, null, 2)}

                Provide:
                1. Key spending categories
                2. Spending anomalies or spikes
                3. Behavioral insights
                4. Specific recommendations to optimize spending
            `;

            const response = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
            });

            return {
                spendingTrends,
                aiInsights: response.text
            };
        } catch (error) {
            console.error('Behavior Analysis Error:', error);
            throw new Error(`Failed to analyze behavior: ${error.message}`);
        }
    }

    static async analyzeHistoricalImpact(userId, startDate) {
        try {
            const simulations = await Simulation.find({
                userId,
                createdAt: { $gte: new Date(startDate) }
            });

            const prompt = `
                Analyze these financial decisions:
                ${JSON.stringify(simulations.map(sim => ({
                date: sim.createdAt,
                scenario: sim.futureState,
                outcome: sim.results
            })))}
                
                Provide:
                1. Decision impact analysis
                2. Missed opportunities
                3. Future recommendations
            `;

            const response = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt
            });

            console.log(response)
            return response.text;
        } catch (error) {
            console.error('Historical Analysis Error:', error);
            throw new Error('Failed to analyze historical impact');
        }
    }

    static async analyzeSimulationScenarios(simulations) {
        try {
            const prompt = `
                Analyze these financial simulation scenarios:
                ${JSON.stringify(simulations.map(sim => ({
                type: sim.futureState?.[0]?.type,
                timeline: sim.futureState?.[0]?.timeline,
                projections: sim.results?.projections
            })))}

                Provide:
                1. Pattern analysis of chosen scenarios
                2. Success probability of each scenario
                3. Risk assessment
                4. Alternative suggestions
            `;

            const response = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt
            });

            console.log(response)
            return response.text;
        } catch (error) {
            console.error('Simulation Analysis Error:', error);
            throw new Error('Failed to analyze simulation scenarios');
        }
    }
}

export const analyzeScenario = async (req, res) => {
    try {
        const { userId } = req.params;
        const { scenarioType, details } = req.body;

        const financialData = await Financial.findOne({ userId });
        if (!financialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        let analysis = {};

        switch (scenarioType) {
            case 'job':
                analysis = analyzeJobScenario(financialData, details);
                break;
            case 'investment':
                analysis = analyzeInvestmentScenario(financialData, details);
                break;
            case 'purchase':
                analysis = analyzePurchaseScenario(financialData, details);
                break;
            default:
                return res.status(400).json({ message: 'Invalid scenario type' });
        }

        // Generate AI insights
        const aiInsights = await AIService.generateRecommendations(userId);

        // Update simulation results
        const simulation = await Simulation.findOneAndUpdate(
            { userId },
            {
                $set: {
                    results: {
                        projections: analysis.projectedSavings || [],
                        recommendations: aiInsights
                    }
                }
            },
            { new: true }
        );

        res.json({
            scenarioType,
            analysis,
            aiInsights,
            simulation
        });
    } catch (error) {
        console.error('Error analyzing scenario:', error);
        res.status(500).json({ message: error.message });
    }
};