import { Router } from 'express';
import {
    updateUserFinancialData,
    getFinancialProfile
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.put('/:userId/financial-data', authenticateToken, updateUserFinancialData);

router.get('/:userId/financial-profile', authenticateToken, getFinancialProfile);

export default router;
