import express from 'express';
import {
  getFinancialData,
  createFinancialData,
  updateFinancialData
} from '../controllers/financial.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

router.use(rateLimiter);

router.get('/:userId', authenticateToken, getFinancialData);
router.post('/:userId', authenticateToken, createFinancialData);
router.put('/:userId', authenticateToken, updateFinancialData);

export default router;