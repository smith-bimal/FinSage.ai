import express from 'express';
import { createSimulation, getSimulationResults, getSimulationProjections, analyzeScenario, analyzeHistoricalDecisions } from '../controllers/simulation.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:userId', authenticateToken, createSimulation);
router.get('/:simulationId/results', authenticateToken, getSimulationResults);
router.post('/:userId/projections', authenticateToken, getSimulationProjections);
router.post('/:userId/scenario', authenticateToken, analyzeScenario);
router.post('/:userId/retrospective', authenticateToken, analyzeHistoricalDecisions);

export default router;