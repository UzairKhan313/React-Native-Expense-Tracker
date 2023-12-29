import { useContext, useEffect, useState } from "react";

import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

function RecentExpensesScreen() {
  const expenesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      expenesCtx.setExpenses(expenses);
    };

    getExpenses();
  }, []);

  const recentExpenses = expenesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No Expense Registered for last 7 days"
    />
  );
}
export default RecentExpensesScreen;
