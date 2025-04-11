import mongoose from 'mongoose';

const scenarioSchema = new mongoose.Schema({
  type: { type: String, required: true },
  timeline: { type: Number, required: true },
  details: mongoose.Schema.Types.Mixed // Flexible structure for scenario-specific details
});

const analysisSchema = new mongoose.Schema({
  yearlyProjections: [{
    year: Number,
    currentPath: Number,
    newPath: Number,
    difference: Number
  }],
  risks: [{
    type: String,
    probability: String,
    impact: Number
  }],
  opportunities: [{
    type: String,
    potentialBenefit: Number,
    requirements: [String]
  }]
});

const retrospectiveSchema = new mongoose.Schema({
  historicalScenario: {
    startDate: Date,
    assumedSavings: Number,
    assumedInvestments: [{
      type: String,
      amount: Number,
      returnRate: Number
    }]
  },
  missedOpportunities: [{
    type: String,
    potentialValue: Number,
    description: String
  }]
});

const simulationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  financialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Financial' }, // Reference to financial data
  currentState: {
    goals: [{
      type: {
        type: String, // Goal type (e.g., "Retirement")
        required: true
      },
      timeline: {
        type: Number, // Timeline in years
        required: true
      },
      targetAmount: {
        type: Number, // Target amount for the goal
        required: true
      },
      priority: {
        type: String, // Priority level (e.g., "High", "Medium", "Low")
        required: true
      }
    }]
  },
  futureState: [scenarioSchema], // Array of scenarios
  analysis: analysisSchema,
  retrospective: retrospectiveSchema,
  results: {
    projections: [{
      year: Number,
      value: Number
    }],
    recommendations: [String],
    year1: Number,
    year5: Number,
    year10: Number
  }
}, { timestamps: true });

const Simulation = mongoose.model('Simulation', simulationSchema);

export default Simulation;