import mongoose from 'mongoose';

const financialProfileSchema = new mongoose.Schema({
  income: Number,
  expenses: {
    fixed: { type: Map, of: Number }, // Fixed expenses (e.g., rent, utilities)
    variable: { type: Map, of: Number } // Variable expenses (e.g., dining, shopping)
  },
  savings: Number,
  investments: [{
    type: String, // Investment type (e.g., stocks, bonds)
    amount: Number,
    returnRate: Number
  }],
  assets: [{
    name: String, // Asset name (e.g., car, house)
    value: Number,
    purchaseDate: Date
  }]
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  financialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Financial' }, // Reference to financial data
  history: [{
    date: Date,
    type: String, // Type of transaction (e.g., income, expense)
    amount: Number,
    category: String
  }]
});

export const User = mongoose.model('User', userSchema);