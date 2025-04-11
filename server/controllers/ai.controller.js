import Simulation from '../models/simulation.model.js';
import {
    analyzeSpendingPatterns,
    analyzeSavingBehavior,
    calculateRiskProfile,
    generatePersonalizedActions,
    analyzeHistoricalDecisions
} from '../helpers/behavior.analysis.js';
import { AIService } from '../services/AI/ai.service.js';

export const generateRecommendations = async (req, res) => {
    try {
        const { userId } = req.body;

        const recommendations = await AIService.generateRecommendations(userId);

        res.json({
            success: true,
            recommendations
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({
            message: 'Failed to generate recommendations',
            error: error.message
        });
    }
};

export const generateBehavioralInsights = async (req, res) => {
    try {
        const { userId } = req.body;
        const simulations = await Simulation.find({ userId }).sort({ createdAt: -1 });

        const behaviorInsights = {
            spendingPatterns: analyzeSpendingPatterns(simulations),
            savingBehavior: analyzeSavingBehavior(simulations),
            riskProfile: calculateRiskProfile(simulations),
            recommendedActions: generatePersonalizedActions(simulations)
        };

        res.json(behaviorInsights);
    } catch (error) {
        console.error('Error generating behavioral insights:', error);
        res.status(500).json({ message: error.message });
    }
};

export const analyzeHistoricalImpact = async (req, res) => {
    try {
        const { userId, decisionDate } = req.body;
        const historicalData = await analyzeHistoricalDecisions(userId, decisionDate);
        res.json(historicalData);
    } catch (error) {
        console.error('Error analyzing historical impact:', error);
        res.status(500).json({ message: error.message });
    }
};

export const analyzeBehavior = async (req, res) => {
    try {
        const { userId } = req.params;

        const behaviorAnalysis = await AIService.analyzeBehavior(userId);

        res.json({
            success: true,
            behaviorAnalysis
        });
    } catch (error) {
        console.error('Error analyzing behavior:', error);
        res.status(500).json({ message: error.message });
    }
};