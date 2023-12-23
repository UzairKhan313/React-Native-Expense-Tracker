import { createContext, useReducer } from "react";

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
  {
    id: "e6",
    description: "A pair of Trouser",
    amount: 45.99,
    date: new Date("2022-12-17"),
  },
  {
    id: "e7",
    description: "Sunglasses",
    amount: 5.99,
    date: new Date("2023-12-16"),
  },
  {
    id: "e8",
    description: "Book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "Mobile Phone",
    amount: 80.99,
    date: new Date("2022-02-18"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      // it will return the index of the item that get update
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      // Getting that expense which is going to update
      const updatableExpenseItem = state[updatableExpenseIndex];

      // override the existing properties of the expense.
      const updatedItem = {
        ...updatableExpenseItem,
        ...action.payload.data,
      };
      // Getting the all expenses array.
      const updatedExpenses = [...state];

      //   updating the array by changing the expense on that index which find above
      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseDate) {
    dispatch({ type: "ADD", payload: expenseDate });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
