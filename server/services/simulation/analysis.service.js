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

      return {
        savingsRate,
        expenseRatio: (totalExpenses / financial.income * 100).toFixed(2),
        riskLevel: this.calculateRiskLevel(financial)
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
}