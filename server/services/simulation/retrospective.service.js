import Simulation from '../../models/simulation.model.js';

export class RetrospectiveService {
  static async analyzeHistoricalDecisions(userId, startDate) {
    try {
      const simulations = await Simulation.find({
        userId,
        createdAt: { $gte: new Date(startDate) }
      }).sort({ createdAt: 1 });

      const analysis = simulations.map(simulation => ({
        date: simulation.createdAt,
        scenario: simulation.futureState[0]?.type,
        netGain: simulation.results?.year1 - simulation.results?.baseline || 0
      }));

      return {
        decisions: analysis,
        summary: {
          totalDecisions: analysis.length,
          positiveDecisions: analysis.filter(a => a.netGain > 0).length,
          negativeDecisions: analysis.filter(a => a.netGain <= 0).length
        }
      };
    } catch (error) {
      console.error('Historical Analysis Error:', error);
      throw new Error(`Failed to analyze historical decisions: ${error.message}`);
    }
  }
}