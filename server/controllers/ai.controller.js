import Simulation from '../models/simulation.model.js';
import { generateGeminiRecommendations } from '../services/AI/ai.service.js';

export const generateRecommendations = async (req, res) => {
  try {
    const { userId } = req.body;

    // Generate AI recommendations
    const { recommendations, analysis, retrospective, results, chartData, generatedInsights } = await generateGeminiRecommendations(userId);

    // Update or create a new simulation with the generated data
    const simulation = await Simulation.findOneAndUpdate(
      { userId },
      {
        $set: {
          recommendations,
          analysis,
          retrospective,
          results,
          chartData,
          generatedInsights,
        }
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      simulation
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      message: 'Failed to generate recommendations',
      error: error.message
    });
  }
};