import { Router } from 'express';
import {
  generateRecommendations,
  generateBehavioralInsights,
  analyzeHistoricalImpact,
  analyzeBehavior
} from '../controllers/ai.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/recommendations', generateRecommendations);

router.post('/behavioral-insights', generateBehavioralInsights);

router.post('/historical-impact', analyzeHistoricalImpact);

router.post('/:userId/behavior', authenticateToken, analyzeBehavior);

export default router;
