import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";

function ManageExpenseScreen({ route, navigation }) {
  const expenesCtx = useContext(ExpensesContext);
  // conditionalluy check the param is define or not
  const editingExpenseId = route.params?.expenseId;
  // Converting editingExpenseId to a boolean
  const isEditing = !!editingExpenseId;

  function deleteExpenseHandler() {
    expenesCtx.deleteExpense(editingExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expenesCtx.updateExpense(editingExpenseId, {
        description: "Update Expense",
        amount: 0.99,
        date: new Date("2023-12-23"),
      });
    } else {
      expenesCtx.addExpense({
        description: "Add Expense",
        amount: 0.99,
        date: new Date("2023-12-22"),
      });
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    //   you should not called setOptions directly instead call is in the useLayoutEffect()
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
      headerTitleAlign: "center",
    });
  }, [isEditing, navigation]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonText={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
