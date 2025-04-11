import { Simulation } from '../../models/simulation.model.js';
import { Financial } from '../../models/financial.model.js';

export class AnalysisService {
    static async analyzeFinancialHealth(userId) {
        try {
            const financial = await Financial.findOne({ userId });
            if (!financial) {
                throw new Error('Financial data not found');
            }

            const totalExpenses = financial.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const savingsRate = ((financial.income - totalExpenses) / financial.income * 100).toFixed(2);
            const investmentTotal = financial.investments.reduce((sum, inv) => sum + inv.amount, 0);

            return {
                savingsRate,
                expenseRatio: (totalExpenses / financial.income * 100).toFixed(2),
                investmentRatio: (investmentTotal / financial.income * 100).toFixed(2),
                riskLevel: this.calculateRiskLevel(financial),
                healthScore: this.calculateHealthScore(financial)
            };
        } catch (error) {
            console.error('Financial Analysis Error:', error);
            throw new Error(`Failed to analyze financial health: ${error.message}`);
        }
    }

    static calculateRiskLevel(financial) {
        const investmentRatio = financial.investments.reduce((sum, inv) => sum + inv.amount, 0) / financial.income;
        if (investmentRatio > 0.5) return 'High';
        if (investmentRatio > 0.3) return 'Moderate';
        return 'Low';
    }

    static calculateHealthScore(financial) {
        // Score from 0-100 based on various factors
        let score = 0;
        const totalExpenses = financial.expenses.reduce((sum, exp) => sum + exp.amount, 0);

        // Savings score (40 points)
        const savingsRate = (financial.income - totalExpenses) / financial.income;
        score += Math.min(savingsRate * 100, 40);

        // Investment score (30 points)
        const investmentRatio = financial.investments.reduce((sum, inv) => sum + inv.amount, 0) / financial.income;
        score += Math.min(investmentRatio * 60, 30);

        // Asset score (30 points)
        const assetValue = financial.assets.reduce((sum, asset) => sum + asset.value, 0);
        const assetRatio = assetValue / (financial.income * 12); // Annual income
        score += Math.min(assetRatio * 30, 30);

        return Math.round(score);
    }
}