import { useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionDetailsPage.scss";
import NotesThread from "../../components/NotesThread/NotesThread";
import OrderDetailsCard from "../../components/OrderDetailsCard/OrderDetailsCard";
import AccountSummaryCard from "../../components/AccountSummaryCard/AccountSummaryCard";

function TransactionDetailsPage() {
  const { transactionId } = useParams();

  return (
    <main className="transaction-details-page">
      <p className="transaction-details-page__text">
        Transaction ID: {transactionId}
      </p>
      {/* Testing */}
      <AccountSummaryCard />
      <OrderDetailsCard />
      <NotesThread />
    </main>
  );
}

export default TransactionDetailsPage;