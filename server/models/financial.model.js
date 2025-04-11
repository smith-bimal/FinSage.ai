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
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }
});

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    depreciationRate: { type: Number, default: 0 }
});

const financialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    income: { type: Number, required: true },
    expenses: [expenseSchema],
    savings: { type: Number, default: 0 },
    investments: [investmentSchema],
    assets: [assetSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

financialSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const Financial = mongoose.model('Financial', financialSchema);