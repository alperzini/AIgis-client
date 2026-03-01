import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage/TransactionDetailsPage";
import { fetchUpdate } from "./utils/apiRequests";
import AppLayout from "./components/AppLayout/AppLayout";

import LoginPage from "./Pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
   <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute/>}>
       <Route element={<AppLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* Transactions List */}
          <Route
            path="/transactions"
            element={
              <TransactionsPage
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />

          {/* Single Transaction Details */}
          <Route
            path="/transactions/:id"
            element={<TransactionDetailsPage />}
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
