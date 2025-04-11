import Simulation from '../../models/simulation.model.js';
import { Financial } from '../../models/financial.model.js';

export class RetrospectiveService {
    static async analyzeHistoricalDecisions(userId, startDate) {
        try {
            const simulations = await Simulation.find({
                userId,
                createdAt: { $gte: new Date(startDate) }
            }).sort({ createdAt: 1 });

            const analysis = [];
            let previousState = null;

            for (const simulation of simulations) {
                const impact = await this.calculateDecisionImpact(simulation, previousState);
                analysis.push({
                    date: simulation.createdAt,
                    scenario: simulation.futureState[0]?.type,
                    impact,
                    success: impact.netGain > 0
                });
                previousState = simulation;
            }

            return {
                decisions: analysis,
                summary: this.generateSummary(analysis)
            };
        } catch (error) {
            console.error('Historical Analysis Error:', error);
            throw new Error(`Failed to analyze historical decisions: ${error.message}`);
        }
    }

    static async calculateDecisionImpact(simulation, previousState) {
        if (!previousState) {
            return {
                netGain: 0,
                riskLevel: 'N/A',
                confidence: 'N/A'
            };
        }

        const currentValue = simulation.results?.year1 || 0;
        const previousValue = previousState.results?.year1 || 0;
        const netGain = currentValue - previousValue;

        return {
            netGain,
            riskLevel: this.assessRiskLevel(simulation, netGain),
            confidence: this.calculateConfidence(simulation, netGain)
        };
    }

    static assessRiskLevel(simulation, netGain) {
        const riskFactors = simulation.analysis?.risks || [];
        const highRiskCount = riskFactors.filter(r => r.impact > 7).length;

        if (highRiskCount > 2) return 'High';
        if (highRiskCount > 0) return 'Moderate';
        return 'Low';
    }

    static calculateConfidence(simulation, netGain) {
        const opportunities = simulation.analysis?.opportunities || [];
        const successRate = opportunities.filter(o => o.potentialBenefit <= netGain).length / opportunities.length;

        if (successRate > 0.7) return 'High';
        if (successRate > 0.4) return 'Moderate';
        return 'Low';
    }

    static generateSummary(analysis) {
        const successfulDecisions = analysis.filter(a => a.success).length;
        const totalDecisions = analysis.length;
        const successRate = (successfulDecisions / totalDecisions * 100).toFixed(2);

        return {
            totalDecisions,
            successfulDecisions,
            successRate,
            trend: this.calculateTrend(analysis)
        };
    }

    static calculateTrend(analysis) {
        const gains = analysis.map(a => a.impact.netGain);
        const trend = gains.reduce((sum, gain) => sum + gain, 0) / gains.length;

        if (trend > 0) return 'Positive';
        if (trend < 0) return 'Negative';
        return 'Neutral';
    }
}