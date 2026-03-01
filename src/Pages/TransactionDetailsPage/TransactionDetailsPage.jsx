import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionDetailsPage.scss";
import NotesThread from "../../components/NotesThread/NotesThread";
import OrderDetailsCard from "../../components/OrderDetailsCard/OrderDetailsCard";
import AccountSummaryCard from "../../components/AccountSummaryCard/AccountSummaryCard";
import Typography from "../../components/Typography/Typography";
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";

function TransactionDetailsPage() {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  return (
    <main className="transaction-details-page">
      <div className="transaction-details-page__header">
        <button className="transaction-details-page__back-button" onClick={() => navigate("/transactions")}>
          <img src={ArrowBack} alt="back-arrow" />
        </button>
        <div className="transaction-details-page__header-text-wrapper">
          <Typography className="transaction-details-page__header-text">Transaction ID: {transactionId}</Typography>
          <Typography className="transaction-details-page__header-text">Active Editor: #38-101-031</Typography>
        </div>
      </div>
      <div className="transaction-details-page__header-buttons">
        <button></button>
        <button></button>
        <button></button>
      </div>

      <div className="transaction-details-page__top-wrapper">
        <div>
          <h1></h1>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="transaction-details-page__bottom-wrapper">
        <div className="transaction-details-page__bottom-left-wrapper">
          <AccountSummaryCard />
          <OrderDetailsCard />
        </div>
      </div>
      <NotesThread />
    </main>
  );
}

export default TransactionDetailsPage;