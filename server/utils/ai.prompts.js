export const AI_PROMPTS = {
    FINANCIAL_RECOMMENDATIONS: (data) => `
        As an expert financial advisor, analyze this financial profile:
        // ... template string for recommendations ...
    `,
    
    BEHAVIOR_ANALYSIS: (data) => `
        As a behavioral finance expert, analyze these spending patterns:
        // ... template string for behavior analysis ...
    `,
    
    HISTORICAL_IMPACT: (data) => `
        As a financial analyst, evaluate these historical decisions:
        // ... template string for historical analysis ...
    `,
    
    SIMULATION_ANALYSIS: (data) => `
        As a risk assessment specialist, analyze these scenarios:
        // ... template string for simulation analysis ...
    `
};

export const AI_GENERATION_CONFIG = {
    DEFAULT: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
    },
    CREATIVE: {
        temperature: 0.9,
        maxOutputTokens: 2048,
    },
    PRECISE: {
        temperature: 0.3,
        maxOutputTokens: 512,
    }
};