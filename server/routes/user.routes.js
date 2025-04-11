import { Router } from 'express';
import {
    updateUserFinancialData,
    getFinancialProfile,
    getUserSummary
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/:userId/summary', authenticateToken, getUserSummary);

router.put('/:userId/financial-data', authenticateToken, updateUserFinancialData);

router.get('/:userId/financial-profile', authenticateToken, getFinancialProfile);

export default router;
