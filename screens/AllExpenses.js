import { useContext } from "react";

import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpensesScreens() {
    const expenesCtx = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expenesCtx.expenses} expensesPeriod="Total" />;
}

export default AllExpensesScreens;
