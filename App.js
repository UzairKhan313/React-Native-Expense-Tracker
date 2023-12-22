import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importting  Screens components
import ManageExpenseScreen from "./screens/ManageExpense";
import RecentExpensesScreen from "./screens/RecentExpenses";
import AllExpensesScreens from "./screens/AllExpenses";

export default function App() {
  // setting bottom and stack Naviagtion.
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function ExpensesOverview() {
    return (
      <BottomTabs.Navigator>
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpensesScreen}
        />
        <BottomTabs.Screen name="AllExpenses" component={AllExpensesScreens} />
      </BottomTabs.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
          <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
