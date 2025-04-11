import Simulation from "../models/simulation.model.js";

export const analyzeSpendingPatterns = (simulations) => {
    const patterns = {};
    const categories = ['food', 'rent', 'shopping', 'utilities', 'transportation', 'entertainment', 'others'];

    // Analyze last 3 simulations for trends
    const recentSims = simulations.slice(0, 3);

    categories.forEach(category => {
        const values = recentSims.map(sim => sim.currentState.expenses[category] || 0);
        const trend = calculateTrend(values);
        const average = values.reduce((a, b) => a + b, 0) / values.length;

        patterns[category] = {
            trend,
            monthlyAverage: average,
            percentage: (average / getTotalExpenses(recentSims[0])) * 100
        };
    });

    return patterns;
};

export const analyzeSavingBehavior = (simulations) => {
    const recentSims = simulations.slice(0, 3);
    const savingsData = recentSims.map(sim => ({
        amount: sim.currentState.savings,
        date: sim.createdAt
    }));

    return {
        consistency: calculateSavingsConsistency(savingsData),
        monthlyAverage: calculateAverageSavings(savingsData),
        trend: calculateTrend(savingsData.map(s => s.amount)),
        savingsRate: calculateSavingsRate(recentSims[0])
    };
};

export const calculateRiskProfile = (simulations) => {
    const latestSim = simulations[0];
    const investments = latestSim.currentState.investments;

    // Calculate risk based on investment distribution
    const riskScores = {
        stocks: 3,
        mutualFunds: 2,
        fixedDeposits: 1,
        others: 2
    };

    let totalRiskScore = 0;
    let totalInvestment = 0;

    Object.entries(investments).forEach(([type, amount]) => {
        if (amount) {
            totalRiskScore += (amount * riskScores[type]);
            totalInvestment += amount;
        }
    });

    const averageRiskScore = totalInvestment ? totalRiskScore / totalInvestment : 0;

    return {
        riskScore: averageRiskScore,
        profile: getRiskProfile(averageRiskScore),
        diversificationScore: calculateDiversificationScore(investments)
    };
};

export const generatePersonalizedActions = (simulations) => {
    const latestSim = simulations[0];
    const actions = [];

    // Analyze current financial state
    const spendingPatterns = analyzeSpendingPatterns([latestSim]);
    const savingBehavior = analyzeSavingBehavior([latestSim]);
    const riskProfile = calculateRiskProfile([latestSim]);

    // Generate recommendations based on analysis
    if (savingBehavior.savingsRate < 20) {
        actions.push({
            type: 'savings',
            priority: 'high',
            action: 'Increase monthly savings by reducing expenses in highest spending categories'
        });
    }

    // Add investment recommendations based on risk profile
    if (riskProfile.diversificationScore < 0.6) {
        actions.push({
            type: 'investment',
            priority: 'medium',
            action: 'Diversify your investment portfolio across different asset classes'
        });
    }

    return actions;
};

export const analyzeHistoricalDecisions = async (userId, decisionDate) => {
    try {
        const simulations = await Simulation.find({
            userId,
            createdAt: { $gte: new Date(decisionDate) }
        }).sort({ createdAt: 1 });

        if (!simulations.length) {
            throw new Error('No simulations found for the given date range.');
        }

        const analysis = simulations.map((simulation) => {
            const netGain = simulation.results?.year1 - simulation.results?.baseline || 0;
            return {
                date: simulation.createdAt,
                scenario: simulation.futureState[0]?.type || 'Unknown',
                netGain,
                risks: simulation.analysis?.risks || [],
                opportunities: simulation.analysis?.opportunities || []
            };
        });

        return {
            success: true,
            analysis,
            summary: {
                totalDecisions: analysis.length,
                positiveDecisions: analysis.filter((a) => a.netGain > 0).length,
                negativeDecisions: analysis.filter((a) => a.netGain <= 0).length
            }
        };
    } catch (error) {
        console.error('Error analyzing historical decisions:', error);
        throw new Error(`Failed to analyze historical decisions: ${error.message}`);
    }
};

// Helper functions
const calculateTrend = (values) => {
    if (values.length < 2) return 'stable';
    const diff = values[0] - values[1];
    return diff > 0 ? 'increasing' : diff < 0 ? 'decreasing' : 'stable';
};

const getTotalExpenses = (simulation) => {
    return Object.values(simulation.currentState.expenses)
        .reduce((a, b) => a + (b || 0), 0);
};

const calculateSavingsConsistency = (savingsData) => {
    // Calculate variance in savings
    const variance = calculateVariance(savingsData.map(s => s.amount));
    return variance < 0.1 ? 'high' : variance < 0.3 ? 'medium' : 'low';
};

const calculateAverageSavings = (savingsData) => {
    return savingsData.reduce((acc, curr) => acc + curr.amount, 0) / savingsData.length;
};

const calculateSavingsRate = (simulation) => {
    const income = simulation.currentState.monthlyIncome;
    const expenses = getTotalExpenses(simulation);
    return ((income - expenses) / income) * 100;
};

const getRiskProfile = (score) => {
    if (score <= 1.5) return 'conservative';
    if (score <= 2.5) return 'moderate';
    return 'aggressive';
};

const calculateDiversificationScore = (investments) => {
    const total = Object.values(investments).reduce((a, b) => a + (b || 0), 0);
    const weights = Object.values(investments).map(v => (v || 0) / total);
    return 1 - Math.sqrt(weights.reduce((acc, w) => acc + w * w, 0));
};

const calculateVariance = (numbers) => {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squareDiffs = numbers.map(value => Math.pow(value - mean, 2));
    return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / numbers.length);
};
