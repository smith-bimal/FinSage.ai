import mongoose from 'mongoose';

const retrospectiveSchema = new mongoose.Schema({
  historicalScenario: {
    startDate: { type: Date },
    assumedSavings: { type: Number },
    assumedInvestments: [{
      type: { type: String },
      amount: { type: Number }
    }]
  },
  missedOpportunities: [{
    type: { type: String },
    potentialValue: { type: Number },
    description: { type: String }
  }]
});

export default retrospectiveSchema;