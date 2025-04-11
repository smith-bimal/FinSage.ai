export const calculateSavingsRate = (income, expenses) => {
  if (income <= 0) return 0;
  const savings = income - expenses;
  return ((savings / income) * 100).toFixed(2);
};

export const calculateNetWorth = (savings, assets) => {
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  return savings + totalAssets;
};

export const projectFutureSavings = (currentSavings, monthlySavings, months) => {
  return currentSavings + monthlySavings * months;
};

export const projectInvestmentGrowth = (initialInvestment, monthlyContribution, annualReturnRate, years) => {
  const monthlyRate = annualReturnRate / 12 / 100;
  let futureValue = initialInvestment;

  for (let i = 0; i < years * 12; i++) {
    futureValue += monthlyContribution;
    futureValue += futureValue * monthlyRate;
  }

  return futureValue;
};

export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};