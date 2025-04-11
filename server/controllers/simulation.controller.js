import Simulation from '../models/simulation.model.js';
import { projectFutureSavings, projectInvestmentGrowth } from '../utils/calculator.js';
import { RetrospectiveService } from '../services/simulation/retrospective.service.js';
import { Financial } from '../models/financial.model.js';
import { analyzeJobScenario, analyzeInvestmentScenario, analyzePurchaseScenario } from '../utils/scenario.helper.js';

export const createSimulation = async (req, res) => {
    try {
        const { userId } = req.params;
        const simulationData = req.body;

        const simulation = new Simulation({ userId, ...simulationData });
        await simulation.save();

        res.status(201).json(simulation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSimulationResults = async (req, res) => {
    try {
        const { simulationId } = req.params;
        const simulation = await Simulation.findById(simulationId);
        if (!simulation) return res.status(404).json({ message: 'Simulation not found' });

        res.json(simulation.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSimulationProjections = async (req, res) => {
    try {
        const { userId } = req.params;
        const { months, annualReturnRate } = req.body;

        const financialData = await Financial.findOne({ userId });
        if (!financialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        const projectedSavings = projectFutureSavings(
            financialData.savings,
            financialData.income * 0.3, // Assuming 30% of income is saved monthly
            months
        );

        const projectedInvestments = projectInvestmentGrowth(
            financialData.investments.reduce((sum, inv) => sum + inv.amount, 0),
            financialData.income * 0.2, // Assuming 20% of income is invested monthly
            annualReturnRate,
            months / 12 // Convert months to years
        );

        res.json({
            projectedSavings,
            projectedInvestments,
            timeline: months
        });
    } catch (error) {
        console.error('Error generating projections:', error);
        res.status(500).json({ message: error.message });
    }
};

export const analyzeScenario = async (req, res) => {
    try {
        const { userId } = req.params;
        const { scenarioType, details } = req.body;

        const financialData = await Financial.findOne({ userId });
        if (!financialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        let analysis = {};

        switch (scenarioType) {
            case 'job':
                analysis = analyzeJobScenario(financialData, details);
                break;
            case 'investment':
                analysis = analyzeInvestmentScenario(financialData, details);
                break;
            case 'purchase':
                analysis = analyzePurchaseScenario(financialData, details);
                break;
            default:
                return res.status(400).json({ message: 'Invalid scenario type' });
        }

        res.json({
            scenarioType,
            analysis
        });
    } catch (error) {
        console.error('Error analyzing scenario:', error);
        res.status(500).json({ message: error.message });
    }
};

export const analyzeHistoricalDecisions = async (req, res) => {
    try {
        const { userId } = req.params;
        const { startDate } = req.body;

        const retrospectiveAnalysis = await RetrospectiveService.analyzeHistoricalDecisions(userId, startDate);

        res.json({
            success: true,
            retrospectiveAnalysis
        });
    } catch (error) {
        console.error('Error analyzing historical decisions:', error);
        res.status(500).json({ message: error.message });
    }
};