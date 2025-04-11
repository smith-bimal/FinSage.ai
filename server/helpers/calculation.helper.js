export const calculateProjections = async (userData) => {
  const INFLATION_RATE = 0.06; // 6% annual inflation
  const INVESTMENT_RETURN = 0.12; // 12% annual return
  const projections = [];

  let currentValue = userData.currentSavings;
  let monthlyInvestment = userData.monthlyIncome * 0.3; // Assuming 30% savings

  // Adjust based on scenario
  switch (userData.scenario) {
    case 'job':
      monthlyInvestment = userData.inputs.expectedSalary * 0.3;
      break;
    case 'business':
      monthlyInvestment *= 0.8; // Reduced savings during business setup
      break;
    case 'asset':
      monthlyInvestment *= 0.7; // Account for EMI
      break;
  }

  for (let year = 1; year <= 10; year++) {
    // Calculate compound interest
    currentValue = currentValue * (1 + INVESTMENT_RETURN) +
      monthlyInvestment * 12 * (1 + INVESTMENT_RETURN/2);
    
    // Adjust for inflation
    const realValue = currentValue / Math.pow(1 + INFLATION_RATE, year);
    
    projections.push({
      year,
      value: Math.round(realValue)
    });
  }

  return projections;
};