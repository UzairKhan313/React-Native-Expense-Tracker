import { useLayoutEffect } from "react";
import { Text } from "react-native";

function ManageExpenseScreen({ route, navigation }) {
  // conditionalluy check the param is define or not
  const editingExpenseId = route.params?.expenseId;
  // Converting editingExpenseId to a boolean
  const isEditing = !!editingExpenseId;

  useLayoutEffect(() => {
    //   you should not called setOptions directly instead call is in the useLayoutEffect()
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
      headerTitleAlign: "center",
    });
  }, [isEditing, navigation]);
}

export default ManageExpenseScreen;
