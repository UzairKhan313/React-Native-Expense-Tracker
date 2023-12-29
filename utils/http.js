import axios from "axios";
import config from "../config/index";

export const postExpense = (expenseData) => {
  axios.post(`${config.FIREBASE_URL}expenses.json`, expenseData);
};
