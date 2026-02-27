import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage/TransactionDetailsPage";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route
          path="/transactions/:transactionId"
          element={<TransactionDetailsPage />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;