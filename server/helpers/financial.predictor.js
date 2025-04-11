export const generateFinancialPredictions = (currentState, futureState) => {
  const predictions = {
    currentScenario: calculateCurrentTrajectory(currentState),
    improvedScenario: calculateImprovedTrajectory(currentState, futureState),
    monthlyProjections: generateMonthlyProjections(currentState, futureState),
    investmentGrowth: predictInvestmentGrowth(currentState.investments),
    savingsPotential: calculateSavingsPotential(currentState)
  };

  return predictions;
};

const calculateCurrentTrajectory = (currentState) => {
  const monthlyIncome = currentState.monthlyIncome;
  const totalExpenses = Object.values(currentState.expenses).reduce((a, b) => a + (b || 0), 0);
  const monthlySavings = monthlyIncome - totalExpenses;
  
  return {
    yearlyData: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      savings: monthlySavings * 12 * (i + 1),
      expenses: totalExpenses * 12 * (1 + (i * 0.05)), // Assuming 5% yearly expense increase
      income: monthlyIncome * 12 * (1 + (i * 0.03))  // Assuming 3% yearly income increase
    }))
  };
};

const calculateImprovedTrajectory = (currentState, futureState) => {
  const optimizedExpenses = Object.entries(currentState.expenses).reduce((acc, [key, value]) => {
    // Suggest 20% reduction in non-essential expenses
    if (['shopping', 'entertainment', 'others'].includes(key)) {
      acc[key] = value * 0.8;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  const improvedSavings = calculateOptimizedSavings(currentState.monthlyIncome, optimizedExpenses);
  const investmentReturns = predictInvestmentReturns(improvedSavings);

  return {
    yearlyData: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      savings: improvedSavings * 12 * (i + 1),
      investments: investmentReturns * (i + 1),
      totalWealth: (improvedSavings * 12 * (i + 1)) + (investmentReturns * (i + 1))
    }))
  };
};

const generateMonthlyProjections = (currentState, futureState) => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    currentPath: {
      savings: currentState.savings + (calculateMonthlySavings(currentState) * i),
      investments: predictMonthlyInvestmentGrowth(currentState.investments, i)
    },
    improvedPath: {
      savings: currentState.savings + (calculateOptimizedSavings(currentState.monthlyIncome, currentState.expenses) * i),
      investments: predictMonthlyInvestmentGrowth(currentState.investments, i, true)
    }
  }));
};

const predictInvestmentGrowth = (investments) => {
  const returns = {
    stocks: 0.12, // 12% annual return
    mutualFunds: 0.10, // 10% annual return
    fixedDeposits: 0.06, // 6% annual return
    others: 0.08 // 8% annual return
  };

  return Object.entries(investments).reduce((acc, [type, amount]) => {
    const growthRate = returns[type] || returns.others;
    acc[type] = Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      value: amount * Math.pow(1 + growthRate, i + 1)
    }));
    return acc;
  }, {});
};

const calculateSavingsPotential = (currentState) => {
  const essentialExpenses = ['food', 'rent', 'utilities'];
  const nonEssentialExpenses = ['shopping', 'entertainment', 'others'];
  
  const essential = essentialExpenses.reduce((sum, category) => 
    sum + (currentState.expenses[category] || 0), 0);
  const nonEssential = nonEssentialExpenses.reduce((sum, category) => 
    sum + (currentState.expenses[category] || 0), 0);

  return {
    currentSavings: currentState.monthlyIncome - (essential + nonEssential),
    potentialSavings: currentState.monthlyIncome - (essential + (nonEssential * 0.6)), // Assuming 40% reduction in non-essential expenses
    savingsIncrease: (nonEssential * 0.4) // Potential monthly savings increase
  };
};

// Helper functions
const calculateMonthlySavings = (state) => {
  const totalExpenses = Object.values(state.expenses).reduce((a, b) => a + (b || 0), 0);
  return state.monthlyIncome - totalExpenses;
};

const calculateOptimizedSavings = (income, expenses) => {
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + (b || 0), 0);
  return income - totalExpenses;
};

const predictMonthlyInvestmentGrowth = (investments, month, improved = false) => {
  const monthlyRate = improved ? 0.01 : 0.007; // 12% vs 8.4% annual return
  return Object.entries(investments).reduce((acc, [type, amount]) => {
    acc[type] = amount * Math.pow(1 + monthlyRate, month);
    return acc;
  }, {});
};

const predictInvestmentReturns = (monthlySavings) => {
  const annualRate = 0.12; // 12% annual return
  return Array.from({ length: 10 }, (_, i) => 
    monthlySavings * 12 * Math.pow(1 + annualRate, i + 1)
  ).reduce((a, b) => a + b, 0);
};
