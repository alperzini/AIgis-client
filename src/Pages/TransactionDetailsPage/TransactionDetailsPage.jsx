import { useParams } from "react-router-dom";
import "./TransactionDetailsPage.scss";

function TransactionDetailsPage() {
const { transactionId } = useParams();

return (
    <main className="transaction-details-page">
    <h1 className="transaction-details-page__title">
        Transaction Details
    </h1>
    <p className="transaction-details-page__text">
        Transaction ID: {transactionId}
    </p>
    </main>
);
}

export default TransactionDetailsPage;