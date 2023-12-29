import axios from "axios";
import config from "../config/index";

export const storeExpense = (expenseData) => {
  axios.post(`${config.FIREBASE_URL}expenses.json`, expenseData);
};
