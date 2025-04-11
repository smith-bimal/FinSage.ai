import { Financial } from '../../../models/financial.model.js';
import { calculateSpendingTrends } from '../../../utils/behavior.helper.js';
import { genAI } from '../config/ai.config.js';

export async function analyzeBehavior(userId) {
    try {
        const financialData = await Financial.findOne({ userId });
        if (!financialData) {
            throw new Error('Financial data not found');
        }

        const spendingTrends = calculateSpendingTrends(financialData.expenses);
        const aiInsights = await generateBehaviorInsights(spendingTrends);

        return { spendingTrends, aiInsights };
    } catch (error) {
        console.error('Behavior Analysis Error:', error);
        throw new Error(`Failed to analyze behavior: ${error.message}`);
    }
}

async function generateBehaviorInsights(spendingTrends) {
    const prompt = `
        Analyze these spending patterns:
        ${JSON.stringify(spendingTrends, null, 2)}
        // ...existing prompt...
    `;

    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    return response.text;
}