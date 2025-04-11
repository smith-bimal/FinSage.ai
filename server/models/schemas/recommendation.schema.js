import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'Expense Optimization',
      'Investment Strategy',
      'Savings Targets',
      'Risk Management',
      'Future Financial Planning'
    ]
  },
  action: { type: String, required: true },
  rationale: { type: String, required: true },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  potentialImpact: {
    monthly: Number,
    yearly: Number
  },
  generatedBy: {
    type: String,
    enum: ['AI', 'User', 'System'],
    default: 'AI'
  }
});

export default recommendationSchema;