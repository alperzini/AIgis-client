import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_BACKEND_PORT;

const BASE_URL = `${BACKEND_URL}${PORT}`;

export const getTransactions = () => axios.get(`${BASE_URL}/transactions`);
export const getTransactionById = (id) =>
  axios.get(`${BASE_URL}/transactions/${id}`);

export const patchTransaction = (id, payload) =>
  axios.patch(`${BASE_URL}/transactions/${id}`, payload);