export const calculateProjections = (userData) => {
  const INFLATION_RATE = 0.06; // 6% annual inflation
  const INVESTMENT_RETURN = 0.12; // 12% annual return
  const projections = [];

  let currentValue = userData.currentSavings;
  let monthlyInvestment = userData.monthlyIncome * 0.3; // Assuming 30% savings

  for (let year = 1; year <= 10; year++) {
    currentValue = currentValue * (1 + INVESTMENT_RETURN) +
      monthlyInvestment * 12 * (1 + INVESTMENT_RETURN / 2);

    const realValue = currentValue / Math.pow(1 + INFLATION_RATE, year);

    projections.push({
      year,
      value: Math.round(realValue)
    });
  }

  return projections;
};