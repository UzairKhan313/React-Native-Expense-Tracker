import { StyleSheet, View } from "react-native";

import ExpensesSummery from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesPeriod }) {
  const DUMMY_EXPENSES = [
    {
      id: "e1",
      description: "A pair of shose",
      amount: 12.99,
      date: new Date("2023-12-15"),
    },
    {
      id: "e2",
      description: "A pair of Trouser",
      amount: 45.99,
      date: new Date("2022-12-17"),
    },
    {
      id: "e3",
      description: "Sunglasses",
      amount: 5.99,
      date: new Date("2023-12-16"),
    },
    {
      id: "e4",
      description: "Book",
      amount: 14.99,
      date: new Date("2022-02-19"),
    },
    {
      id: "e5",
      description: "Mobile Phone",
      amount: 80.99,
      date: new Date("2022-02-18"),
    },
  ];
  return (
    <View>
      <ExpensesSummery expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList />
    </View>
  );
}

export default ExpensesOutput;