import { Simulation } from '../../models/simulation.model.js';
import { User } from '../../models/user.model.js';

export class SimulationService {
    static async createSimulation(userId, data) {
        try {
            const user = await User.findById(userId).populate('financialId');
            if (!user) {
                throw new Error('User not found');
            }

            const simulation = new Simulation({
                userId,
                financialId: user.financialId,
                currentState: {
                    goals: data.goals || []
                },
                futureState: data.scenarios || [],
            });

            await simulation.save();
            return simulation;
        } catch (error) {
            console.error('Simulation Creation Error:', error);
            throw new Error(`Failed to create simulation: ${error.message}`);
        }
    }

    static async getLatestSimulation(userId) {
        try {
            return await Simulation.findOne({ userId })
                .sort({ createdAt: -1 })
                .populate('financialId');
        } catch (error) {
            console.error('Fetch Simulation Error:', error);
            throw new Error(`Failed to fetch latest simulation: ${error.message}`);
        }
    }

    static async updateSimulation(simulationId, updates) {
        try {
            return await Simulation.findByIdAndUpdate(
                simulationId,
                { $set: updates },
                { new: true }
            );
        } catch (error) {
            console.error('Update Simulation Error:', error);
            throw new Error(`Failed to update simulation: ${error.message}`);
        }
    }
}