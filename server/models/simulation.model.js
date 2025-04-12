import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  financialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Financial'
  },
  financialData: {
    income: Number,
    expenses: Number,
    savings: Number,
    monthlyInvestments: Number
  },
  accuracyPercentage: {
    type: Number,
    default: 0
  },
  recommendations: [{
    category: {
      type: String,
      enum: ['Expense Optimization', 'Investment Strategy', 'Savings Targets', 'Risk Management', 'Future Financial Planning']
    },
    action: String,
    rationale: String,
    confidenceScore: Number,
    potentialImpact: {
      monthly: Number,
      yearly: Number
    }
  }],
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
      averageSavingsRate: Number,
      incomeVsExpenses: {
        monthlyIncome: Number,
        totalMonthlyExpenses: Number,
        savingsPotential: Number
      }
    }
  },
  chartData: {
    expenseBreakdown: [{
      category: String,
      amount: Number
    }],
    incomeVsExpenses: [{
      label: String,
      amount: Number
    }],
    savingsProgress: [{
      month: String,
      amount: Number
    }],
    projections: {
      shortTerm: {
        timestamps: [String], // 12 months
        actualValues: [Number],
        recommendedValues: [Number]
      },
      longTerm: {
        timestamps: [String], // 10 years
        actualValues: [Number],
        recommendedValues: [Number]
      }
    }
  }
}, { timestamps: true });

const Simulation = mongoose.model('Simulation', simulationSchema);
export default Simulation;