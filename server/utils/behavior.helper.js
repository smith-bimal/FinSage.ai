export const calculateSpendingTrends = (expenses) => {
    const trends = {};

    expenses.forEach((expense) => {
        const category = expense.category;
        const month = new Date(expense.date).toISOString().slice(0, 7);

        if (!trends[category]) {
            trends[category] = {};
        }

        if (!trends[category][month]) {
            trends[category][month] = 0;
        }

        trends[category][month] += expense.amount;
    });

    return trends;
};