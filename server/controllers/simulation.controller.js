import Simulation from '../models/simulation.model.js';
import { Financial } from '../models/financial.model.js';
import { analyzeBehaviorGemini, generateGeminiRecommendations } from '../services/AI/ai.service.js';

export const createSimulation = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get both AI recommendations and behavior analysis
    const [aiData, behaviorData] = await Promise.all([
      generateGeminiRecommendations(userId),
      analyzeBehaviorGemini(userId)
    ]);

    // Combine the data
    const simulation = new Simulation({
      userId,
      recommendations: aiData.recommendations,
      behaviorAnalysis: behaviorData.behaviorAnalysis,
      chartData: {
        ...aiData.chartData,
        historicalTrends: behaviorData.historicalAnalysis?.trends || []
      }
    });

    await simulation.save();
    res.status(201).json(simulation);
  } catch (error) {
    console.error('Error creating simulation:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getSimulationWithBehavior = async (req, res) => {
  try {
    const { userId } = req.params;
    const simulation = await Simulation.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!simulation) {
      return res.status(404).json({ message: 'No simulation found' });
    }

    // Get fresh behavior analysis
    const behaviorData = await analyzeBehaviorGemini(userId);
    
    // Update simulation with latest behavior
    simulation.behaviorAnalysis = behaviorData.behaviorAnalysis;
    simulation.chartData.historicalTrends = behaviorData.historicalAnalysis?.trends || [];
    await simulation.save();

    res.json(simulation);
  } catch (error) {
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