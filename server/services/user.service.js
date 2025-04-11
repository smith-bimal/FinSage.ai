import { User } from '../models/user.model.js';
import { Financial } from '../models/financial.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
    static async createUser(userData) {
        try {
            const { email, password, name } = userData;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            // Create initial financial profile
            const financial = new Financial({
                userId: user._id,
                income: 0,
                expenses: [],
                savings: 0,
                investments: [],
                assets: []
            });

            await financial.save();
            user.financialId = financial._id;
            await user.save();

            return user;
        } catch (error) {
            console.error('User Creation Error:', error);
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    static async authenticateUser(email, password) {
        try {
            // Find user by email
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return { user, token };
        } catch (error) {
            console.error('Authentication Error:', error);
            throw new Error(`Failed to authenticate: ${error.message}`);
        }
    }

    static async getUserProfile(userId) {
        try {
            const user = await User.findById(userId)
                .populate('financialId')
                .select('-password');

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            console.error('Fetch Profile Error:', error);
            throw new Error(`Failed to fetch user profile: ${error.message}`);
        }
    }

    static async updateUserProfile(userId, updates) {
        try {
            // Don't allow password updates through this method
            delete updates.password;

            const user = await User.findByIdAndUpdate(
                userId,
                { $set: updates },
                { new: true }
            ).select('-password');

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            console.error('Update Profile Error:', error);
            throw new Error(`Failed to update user profile: ${error.message}`);
        }
    }

    static async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await User.findById(userId).select('+password');
            if (!user) {
                throw new Error('User not found');
            }

            // Verify old password
            const isValidPassword = await bcrypt.compare(oldPassword, user.password);
            if (!isValidPassword) {
                throw new Error('Current password is incorrect');
            }

            // Hash and update new password
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return { message: 'Password updated successfully' };
        } catch (error) {
            console.error('Password Change Error:', error);
            throw new Error(`Failed to change password: ${error.message}`);
        }
    }

    static async getUserFinancialSummary(userId) {
        try {
            const financial = await Financial.findOne({ userId });
            if (!financial) {
                throw new Error('Financial data not found');
            }

            const totalExpenses = financial.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const totalInvestments = financial.investments.reduce((sum, inv) => sum + inv.amount, 0);
            const totalAssets = financial.assets.reduce((sum, asset) => sum + asset.value, 0);

            return {
                monthlyIncome: financial.income,
                totalExpenses,
                savings: financial.savings,
                totalInvestments,
                totalAssets,
                netWorth: financial.savings + totalInvestments + totalAssets,
                savingsRate: ((financial.income - totalExpenses) / financial.income * 100).toFixed(2)
            };
        } catch (error) {
            console.error('Financial Summary Error:', error);
            throw new Error(`Failed to get financial summary: ${error.message}`);
        }
    }
}