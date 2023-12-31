import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";
import { storeExpense, updateExpense, deleteExpense } from "../utils/http";
import LoadingOverLay from "../components/UI/LoadingOverLay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenseScreen({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expenesCtx = useContext(ExpensesContext);
  // conditionalluy check the param is define or not
  const editingExpenseId = route.params?.expenseId;
  // Converting editingExpenseId to a boolean
  const isEditing = !!editingExpenseId;

  const selectExpense = expenesCtx.expenses.find(
    (expense) => expense.id === editingExpenseId
  );

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editingExpenseId);
      // setIsSubmitting(false);
      expenesCtx.deleteExpense(editingExpenseId);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setError("Could not Delete the Expense");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenesCtx.updateExpense(editingExpenseId, expenseData);
        await updateExpense(editingExpenseId, expenseData);
      } else {
        // storing Expense in fire base
        const id = await storeExpense(expenseData);
        expenesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (err) {
      setError("Could not update or add the new Expense");
      setIsSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    //   you should not called setOptions directly instead call is in the useLayoutEffect()
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
      headerTitleAlign: "center",
    });
  }, [isEditing, navigation]);

  function errorHandler() {
    setError(false);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverLay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonText={isEditing ? "Update" : "Add"}
        defaultValues={selectExpense}
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
