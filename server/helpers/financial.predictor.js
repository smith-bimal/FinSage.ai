export const generateFinancialPredictions = (currentState) => {
  const monthlyIncome = currentState.monthlyIncome || 0;
  const totalExpenses = currentState.expenses || 0;
  const currentSavings = currentState.currentSavings || 0;
  const monthlySavings = Math.max(monthlyIncome - totalExpenses, 0);

  const timestamps = [];
  const actualValues = [];
  const recommendedValues = [];

  for (let year = 1; year <= 10; year++) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + year);
    timestamps.push(date.toISOString().split('T')[0]);

    const yearlyActualSavings = currentSavings + (monthlySavings * 12 * year);
    actualValues.push(Math.round(yearlyActualSavings));
    recommendedValues.push(Math.round(yearlyActualSavings * 1.2));
  }

  return {
    timestamps,
    actualValues,
    recommendedValues
  };
};
