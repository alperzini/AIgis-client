import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage/TransactionDetailsPage";
import Footer from './components/Footer/Footer';
import { fetchUpdate } from "./utils/apiRequests";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      fetchUpdate("transactions", (data) => {
        console.log("DATA RECEIVED FROM BACKEND:", data);
        setTransactions(data);
      });
    }, []);

  return (
    <BrowserRouter>
      <AppLayout>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Transactions List */}
        <Route path="/transactions" element={<TransactionsPage transactions={transactions} setTransactions={setTransactions} />} />

        {/* Single Transaction Details */}
        <Route path="/transactions/:id" element={<TransactionDetailsPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      </AppLayout>

    </BrowserRouter>
  );
}

export default App;