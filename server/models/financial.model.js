import { config } from 'dotenv';
config({ path: '../.env' });

import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ['one-time', 'monthly', 'yearly'], default: 'monthly' },
  date: { type: Date, default: Date.now }
});

const investmentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  returnRate: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now }
});

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  purchaseDate: { type: Date, required: true }
});

const financialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, required: true },
  expenses: [expenseSchema],
  savings: { type: Number, default: 0 },
  investments: [investmentSchema],
  monthlyInvestments: { type: Number, default: 0 },
  assets: [assetSchema],
  updatedAt: { type: Date, default: Date.now }
});

financialSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  
  if (this.investments && this.investments.length > 0) {
    this.monthlyInvestments = this.investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  }
  
  next();
});

export const Financial = mongoose.model('Financial', financialSchema);