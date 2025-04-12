import mongoose from 'mongoose';

const financialHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  simulationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Simulation',
    required: false // Make simulationId optional
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  pastDecisionsImpact: {
    positiveImpacts: [{
      decision: String,
      impact: String,
      financialEffect: String
    }],
    negativeImpacts: [{
      decision: String,
      impact: String, 
      financialEffect: String
    }],
    suggestions: [{
      area: String,
      suggestion: String,
      potentialBenefit: String
    }]
  },
  behaviorAnalysis: {
    spendingPatterns: {
      categories: [{
        name: String,
        monthlyAverage: Number,
        trend: String
      }]
    },
    savingsBehavior: {
      consistency: String,
      averageSavingsRate: Number
    }
  },
  financialSnapshot: {
    income: Number,
    expenses: Number,
    savings: Number,
    investments: Number
  },
  analysisResults: {
    score: Number,
    strengths: [String],
    weaknesses: [String]
  }
}, { timestamps: true });

export const FinancialHistory = mongoose.model('FinancialHistory', financialHistorySchema);