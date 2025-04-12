import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  monthlyIncome: { type: Number, required: true },
  totalExpenses: { type: Number, required: true },
  currentSavings: { type: Number, required: true },
  savingsRate: { type: Number, required: true },
  yearlyProjections: [{
    year: Number,
    currentPath: Number,
    newPath: Number,
    difference: Number
  }],
  risks: [{
    riskType: String,
    probability: String,
    impact: Number
  }],
  opportunities: [{
    opportunityType: String,
    potentialBenefit: Number
  }]
});

export default analysisSchema;