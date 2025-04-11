import { projectFutureSavings, projectInvestmentGrowth } from '../utils/calculator.js';
import { AIService } from '../services/AI/ai.service.js';

export const analyzeJobScenario = (financialData, details) => {
    const { newSalary, timeline } = details;

    const currentSavings = financialData.savings;
    const monthlySavings = newSalary * 0.3; // Assume 30% of new salary is saved
    const projectedSavings = projectFutureSavings(currentSavings, monthlySavings, timeline);

    return {
        currentSavings,
        newSalary,
        projectedSavings,
        timeline
    };
};

export const analyzeInvestmentScenario = (financialData, details) => {
    const { investmentAmount, annualReturnRate, timeline } = details;

    const projectedInvestmentValue = projectInvestmentGrowth(
        investmentAmount,
        0, // No monthly contributions for this scenario
        annualReturnRate,
        timeline / 12 // Convert months to years
    );

    return {
        investmentAmount,
        annualReturnRate,
        projectedInvestmentValue,
        timeline
    };
};

export const analyzePurchaseScenario = (financialData, details) => {
    const { purchaseCost, timeline } = details;

    const currentSavings = financialData.savings;
    const remainingSavings = currentSavings - purchaseCost;

    return {
        currentSavings,
        purchaseCost,
        remainingSavings,
        timeline
    };
};

export const createSimulation = async (req, res) => {
    try {
        const { userId } = req.params;
        const simulationData = req.body;

        // Fetch financial data for projections
        const financialData = await Financial.findOne({ userId });
        if (!financialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        // Calculate projections
        const projectedSavings = projectFutureSavings(
            financialData.savings,
            financialData.income * 0.3, // Assuming 30% of income is saved monthly
            60 // 5 years (60 months)
        );

        const projectedInvestments = projectInvestmentGrowth(
            financialData.investments.reduce((sum, inv) => sum + inv.amount, 0),
            financialData.income * 0.2, // Assuming 20% of income is invested monthly
            8, // Annual return rate
            5 // 5 years
        );

        // Add projections to simulation results
        const simulation = new Simulation({
            userId,
            ...simulationData,
            results: {
                projections: [
                    { year: 1, value: projectedSavings + projectedInvestments },
                    { year: 5, value: projectedSavings + projectedInvestments * 1.5 }
                ]
            }
        });

        await simulation.save();

        res.status(201).json(simulation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

        res.json({
            scenarioType,
            analysis,
            aiInsights
        });
    } catch (error) {
        console.error('Error analyzing scenario:', error);
        res.status(500).json({ message: error.message });
    }
};