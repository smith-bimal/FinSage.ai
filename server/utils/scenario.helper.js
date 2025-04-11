import { projectFutureSavings, projectInvestmentGrowth } from './calculator.js';

export const analyzeJobScenario = (financialData, details) => {
  const { newSalary, timeline } = details;

  const currentSavings = financialData.savings;
  const monthlySavings = newSalary * 0.3; // Assume 30% of new salary is saved
  const projectedSavings = projectFutureSavings(currentSavings, monthlySavings, timeline);

  return {
    currentSavings,
    newSalary,
    projectedSavings,
    timeline
  };
};

export const analyzeInvestmentScenario = (financialData, details) => {
  const { investmentAmount, annualReturnRate, timeline } = details;

  const projectedInvestmentValue = projectInvestmentGrowth(
    investmentAmount,
    0, // No monthly contributions for this scenario
    annualReturnRate,
    timeline / 12 // Convert months to years
  );

  return {
    investmentAmount,
    annualReturnRate,
    projectedInvestmentValue,
    timeline
  };
};

export const analyzePurchaseScenario = (financialData, details) => {
  const { purchaseCost, timeline } = details;

  const currentSavings = financialData.savings;
  const remainingSavings = currentSavings - purchaseCost;

  return {
    currentSavings,
    purchaseCost,
    remainingSavings,
    timeline
  };
};