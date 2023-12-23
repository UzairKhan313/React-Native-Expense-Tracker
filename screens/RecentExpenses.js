import { useContext } from "react";

import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";

function RecentExpensesScreen() {
  const expenesCtx = useContext(ExpensesContext);
  const recentExpenses = expenesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}
export default RecentExpensesScreen;
