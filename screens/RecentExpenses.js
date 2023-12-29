import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverLay from "../components/UI/LoadingOverLay";
import { ExpensesContext } from "../store/context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpensesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expenesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expenesCtx.setExpenses(expenses);
      } catch (err) {
        console.log(err);
        setError("Could not Fetch Expenses");
      }
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  function errorHandler(){
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingOverLay />;
  }

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
