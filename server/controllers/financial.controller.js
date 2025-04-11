import { Financial } from '../models/financial.model.js';

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

    res.json(updatedFinancialData);
  } catch (error) {
    console.error('Error updating financial data:', error);
    res.status(500).json({ message: error.message });
  }
};