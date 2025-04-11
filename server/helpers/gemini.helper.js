import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateRecommendations = async (userData, projections) => {
    try {

        const prompt = `
      Based on the following financial data:
      - Current Income: ₹${userData.monthlyIncome}
      - Monthly Expenses: ₹${Object.values(userData.expenses).reduce((a, b) => a + b, 0)}
      - Current Savings: ₹${userData.currentSavings}
      - Scenario: ${userData.scenario}
      
      And projected values:
      - 1 Year: ₹${projections[0].value}
      - 5 Years: ₹${projections[4].value}
      - 10 Years: ₹${projections[9].value}

      Provide 3-4 specific financial recommendations in Indian context.
      Format each recommendation as a concise action item.
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Explain how AI works",
        });
        console.log(response.text);

        const recommendations = response.text
            .split('\n')
            .filter(rec => rec.trim())
            .map(rec => rec.replace(/^\d+\.\s*/, ''));

        return recommendations;
    } catch (error) {
        console.error('Gemini API error:', error);
        return [
            'Consider diversifying your investments',
            'Review and optimize your monthly expenses',
            'Build an emergency fund'
        ];
    }
};