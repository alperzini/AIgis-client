import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./components/Navigation/Navigation";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage/TransactionDetailsPage";

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // http://localhost:
  const PORT = import.meta.env.VITE_PORT;                // 8080

  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsRes = await axios.get(`${BACKEND_URL}${PORT}/transactions`);
        settransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage transactions={transactions} settransactions={settransactions} />} />
        <Route path="/transactions/:id" element={<TransactionDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;