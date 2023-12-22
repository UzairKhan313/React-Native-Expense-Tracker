import { StyleSheet, View, Text } from "react-native";

function ExpensesSummery({ expenses, periodName }) {
  // reduce Method allow us to combine multiple value in array into a single value,
  // Argument for reduce method is function and second one is value for the carry on variable in this case which is sum.
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
export default ExpensesSummery;

const styles = StyleSheet.create({});
