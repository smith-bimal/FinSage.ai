import { FinancialHistory } from '../models/financial.history.model.js';
import { Financial } from '../models/financial.model.js';
import Simulation from '../models/simulation.model.js';

export const getFinancialHistoryData = async (req, res) => {
  try {
    const { simulationId } = req.params;
    const financialHistoryData = await FinancialHistory.findOne({ simulationId });
    if (!financialHistoryData) return res.status(404).json({ message: 'Financial history data not found' });

    res.status(200).json(financialHistoryData);
  } catch (error) {
    console.error('Error fetching financial history data:', error);
    res.status(500).json({ message: error.message });
  }
}

export const getFinancialData = async (req, res) => {
  try {
    const { userId } = req.params;
    const financialData = await Financial.findOne({ userId });
    if (!financialData) return res.status(404).json({ message: 'Financial data not found' });

    res.json(financialData);
  } catch (error) {
    console.error('Error fetching financial data:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createFinancialData = async (req, res) => {
  try {
    const { userId } = req.params;
    const financialData = req.body;

    // Calculate monthlyInvestments if investments are provided
    if (financialData.investments && Array.isArray(financialData.investments)) {
      financialData.monthlyInvestments = financialData.investments.reduce(
        (sum, inv) => sum + Number(inv.amount || 0), 0
      );
    }

    const newFinancialData = new Financial({ userId, ...financialData });
    await newFinancialData.save();

    res.status(201).json(newFinancialData);
  } catch (error) {
    console.error('Error creating financial data:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateFinancialData = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const updatedFinancialData = await Financial.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    );

    if (!updatedFinancialData) return res.status(404).json({ message: 'Financial data not found' });

    // Calculate total monthly investments
    const totalMonthlyInvestments = Array.isArray(updatedFinancialData.investments) 
      ? updatedFinancialData.investments.reduce((sum, inv) => sum + Number(inv.amount || 0), 0)
      : 0;

    // Update all simulations for this user with the latest financial data
    await Simulation.updateMany(
      { userId },
      { 
        $set: { 
          'financialData.income': updatedFinancialData.income,
          'financialData.expenses': Array.isArray(updatedFinancialData.expenses) 
            ? updatedFinancialData.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0) 
            : 0,
          'financialData.savings': updatedFinancialData.savings,
          'financialData.monthlyInvestments': totalMonthlyInvestments
        } 
      }
    );

    res.json(updatedFinancialData);
  } catch (error) {
    console.error('Error updating financial data:', error);
    res.status(500).json({ message: error.message });
  }
};