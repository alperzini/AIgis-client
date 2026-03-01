import { useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionDetailsPage.scss";

function TransactionDetailsPage() {
  const { transactionId } = useParams();

  return (
    <main className="transaction-details-page">
        <p className="transaction-details-page__text">
          Transaction ID: {transactionId}
        </p>
    </main>
  );
}

export default TransactionDetailsPage;