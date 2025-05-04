import Simulation from '../models/simulation.model.js';
import { Financial } from '../models/financial.model.js';
import { analyzeBehaviorGemini, generateGeminiRecommendations } from '../services/AI/ai.service.js';
import { debugAIResponse, validateSimulationData } from '../helpers/debug.helper.js';
import { FinancialHistory } from '../models/financial.history.model.js';

export const createSimulation = async (req, res) => {
  try {
    const financeId = req.body;

    // First, fetch the user's financial data to incorporate it
    const userFinancialData = await Financial.findById(financeId);
    if (!userFinancialData) {
      return res.status(404).json({ message: 'User financial data not found. Please set up financial data first.' });
    }

    // Calculate the total monthly investments from the investments array
    const totalMonthlyInvestments = Array.isArray(userFinancialData.investments)
      ? userFinancialData.investments.reduce((sum, inv) => sum + Number(inv.amount || 0), 0)
      : userFinancialData.monthlyInvestments || 0;

    // Step 1: Create the simulation with recommendations first
    const aiData = await generateGeminiRecommendations(userFinancialData);

    // Debug the AI response
    debugAIResponse(aiData);

    const simulation = new Simulation({
      userId: userFinancialData.userId,
      financialId: userFinancialData._id,
      financialData: {
        income: userFinancialData.income,
        expenses: Array.isArray(userFinancialData.expenses)
          ? userFinancialData.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0)
          : 0,
        savings: userFinancialData.savings,
        monthlyInvestments: totalMonthlyInvestments
      },
      recommendations: aiData.recommendations,
      accuracyPercentage: aiData.accuracyPercentage,
      behaviorAnalysis: {
        spendingPatterns: { categories: [] },
        savingsBehavior: { consistency: 'initializing', averageSavingsRate: 0 }
      },
      chartData: {
        ...aiData.chartData,
        historicalTrends: []
      }
    });

    // Validate simulation data before saving
    validateSimulationData(simulation);

    // Save the simulation to get an ID
    await simulation.save();

    // After save, check if accuracyPercentage was stored
    const savedSimulation = await Simulation.findById(simulation._id);
    console.log("Saved simulation accuracyPercentage:", savedSimulation.accuracyPercentage);

    // Step 2: Now generate behavior analysis with both IDs available
    const behaviorData = await analyzeBehaviorGemini(financeId, simulation._id);

    // Step 3: Update the simulation with behavior data
    simulation.behaviorAnalysis = behaviorData.behaviorAnalysis;
    simulation.chartData.historicalTrends = behaviorData.historicalAnalysis?.trends || [];
    simulation.pastDecisionsImpact = behaviorData.pastDecisionsImpact || {
      positiveImpacts: [],
      negativeImpacts: [],
      suggestions: []
    };

    await simulation.save();

    res.status(201).json({ simulationId: simulation._id, message: 'Simulation created successfully', simulation });
  } catch (error) {
    console.error('Error creating simulation:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getSimulationWithBehavior = async (req, res) => {
  try {
    const { userId, simulationId } = req.params;

    // Find the specific simulation using both userId and simulationId
    const simulation = await Simulation.findById(simulationId).where({ userId });

    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    // Pass both IDs to the behavior analysis function
    const behaviorData = await analyzeBehaviorGemini(userId, simulationId);

    // Update simulation with latest behavior
    simulation.behaviorAnalysis = behaviorData.behaviorAnalysis;
    simulation.chartData.historicalTrends = behaviorData.historicalAnalysis?.trends || [];
    simulation.pastDecisionsImpact = behaviorData.pastDecisionsImpact || {
      positiveImpacts: [],
      negativeImpacts: [],
      suggestions: []
    };

    await simulation.save();

    res.status(201).json(behaviorData);
  } catch (error) {
    console.error('Error updating simulation with behavior:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getOneSimulation = async (req, res) => {
  try {
    const { userId, id } = req.params;

    // Fetch the simulation
    const simulation = await Simulation.findOne({ userId, _id: id }).populate('financialId').populate('userId', 'name email');

    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    // Fetch related financial data to ensure it's current
    const financialData = await Financial.findOne({ userId });
    if (financialData) {
      // Calculate total monthly investments
      const totalMonthlyInvestments = Array.isArray(financialData.investments)
        ? financialData.investments.reduce((sum, inv) => sum + Number(inv.amount || 0), 0)
        : 0;

      // Update the simulation's financial data with the latest
      simulation.financialData = {
        income: financialData.income,
        expenses: Array.isArray(financialData.expenses)
          ? financialData.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0)
          : 0,
        savings: financialData.savings,
        monthlyInvestments: totalMonthlyInvestments
      };

      // Save the updated simulation so the financial data persists
      await simulation.save();
    }

    res.status(200).json(simulation);
  } catch (error) {
    console.error('Error fetching simulation:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getSimulations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all simulations
    const simulations = await Simulation.find({ userId });

    // Fetch financial data 
    const financialData = await Financial.findOne({ userId });

    if (financialData && simulations.length > 0) {
      // Calculate total monthly investments
      const totalMonthlyInvestments = Array.isArray(financialData.investments)
        ? financialData.investments.reduce((sum, inv) => sum + Number(inv.amount || 0), 0)
        : financialData.monthlyInvestments || 0;

      // Update each simulation with the latest financial data
      simulations.forEach(simulation => {
        simulation.financialData = {
          income: financialData.income,
          expenses: Array.isArray(financialData.expenses)
            ? financialData.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0)
            : 0,
          savings: financialData.savings,
          monthlyInvestments: totalMonthlyInvestments || financialData.monthlyInvestments || 0
        };
      });
    }

    res.json(simulations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const simulation = await Simulation.findByIdAndUpdate(id, updates, { new: true });
    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    res.json(simulation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Optional: can be used for additional security check

    // Find the simulation first
    const simulation = await Simulation.findById(id);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    // Optional: verify that the simulation belongs to the user
    if (userId && simulation.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this simulation' });
    }

    await Simulation.findByIdAndDelete(id); // Delete the simulation
    await FinancialHistory.deleteMany({ simulationId: id }); // Delete associated financial history records
    await Financial.findByIdAndDelete(simulation.financialId); // Delete associated financial data

    res.json({ message: 'Simulation and associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting simulation:', error);
    res.status(500).json({ message: error.message });
  }
};