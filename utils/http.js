import axios from "axios";
import config from "../config/index";

export const storeExpense = async (expenseData) => {
  const responce = await axios.post(
    `${config.FIREBASE_URL}expenses.json`,
    expenseData
  );
  const id = responce.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const responce = await axios.get(`${config.FIREBASE_URL}expenses.json`);
  const expesnes = [];
  for (key in responce.data) {
    const expenseObj = {
      id: key,
      amount: responce.data[key].amount,
      date: new Date(responce.data[key].date),
      description: responce.data[key].description,
    };
    expesnes.push(expenseObj);
  }
  return expesnes;
};

export const updateExpense = (id, expenseData) => {
  return (responce = axios.put(
    `${config.FIREBASE_URL}expenses/${id}.json`,
    expenseData
  ));
};
export const deleteExpense = (id) => {
  return axios.delete(`${config.FIREBASE_URL}expenses/${id}.json` );
};
