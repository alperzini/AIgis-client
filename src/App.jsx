import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./components/Navigation/Navigation";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage/TransactionDetailsPage";
import Footer from './components/Footer/Footer';

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // http://localhost:
  const PORT = import.meta.env.VITE_PORT;                // 8080

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesRes = await axios.get(`${BACKEND_URL}${PORT}/expenses`);
        setExpenses(expensesRes.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/expenses" element={<TransactionsPage expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/expenses/:id" element={<TransactionDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;