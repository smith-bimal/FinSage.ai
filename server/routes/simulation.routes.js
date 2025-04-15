import express from 'express';
import {
    createSimulation,
    getSimulations,
    updateSimulation,
    deleteSimulation,
    getSimulationWithBehavior,
    getOneSimulation
} from '../controllers/simulation.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:userId', authenticateToken, createSimulation);
router.get('/:userId', authenticateToken, getSimulations);
router.get('/:userId/:id', getOneSimulation);
router.get('/:userId/:simulationId/behavior', authenticateToken, getSimulationWithBehavior);
router.put('/:id', authenticateToken, updateSimulation);
router.delete('/:id', authenticateToken, deleteSimulation);

export default router;