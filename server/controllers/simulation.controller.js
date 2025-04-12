import Simulation from '../models/simulation.model.js';
import { analyzeBehaviorGemini, generateGeminiRecommendations } from '../services/AI/ai.service.js';

export const createSimulation = async (req, res) => {
  try {
    const { userId } = req.params;

    // Step 1: Create the simulation with recommendations first
    const aiData = await generateGeminiRecommendations(userId);

    const simulation = new Simulation({
      userId,
      recommendations: aiData.recommendations,
      behaviorAnalysis: {
        spendingPatterns: { categories: [] },
        savingsBehavior: { consistency: 'initializing', averageSavingsRate: 0 }
      },
      chartData: {
        ...aiData.chartData,
        historicalTrends: []
      }
    });

    // Save the simulation to get an ID
    await simulation.save();

    // Step 2: Now generate behavior analysis with both IDs available
    const behaviorData = await analyzeBehaviorGemini(userId, simulation._id);

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

export const getSimulations = async (req, res) => {
  try {
    const { userId } = req.params;
    const simulations = await Simulation.find({ userId });
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

    const simulation = await Simulation.findByIdAndDelete(id);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    res.json({ message: 'Simulation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};