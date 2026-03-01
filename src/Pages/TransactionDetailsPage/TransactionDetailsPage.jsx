import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionDetailsPage.scss";
import NotesThread from "../../components/NotesThread/NotesThread";
import OrderDetailsCard from "../../components/OrderDetailsCard/OrderDetailsCard";
import AccountSummaryCard from "../../components/AccountSummaryCard/AccountSummaryCard";
import Typography from "../../components/Typography/Typography";
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import Button from "../../components/Button/Button.jsx";
import DetailsCard from "../../components/DetailsCard/DetailsCard.jsx";

function TransactionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main className="transaction-details-page">
      <div className="transaction-details-page__header">
        <button className="transaction-details-page__back-button" onClick={() => navigate("/transactions")}>
          <img src={ArrowBack} alt="back-arrow" />
        </button>
        <div className="transaction-details-page__header-text-wrapper">
          <Typography className="transaction-details-page__header-text">Transaction ID: {id}</Typography>
          <Typography className="transaction-details-page__header-text">Active Editor: #38-101-031</Typography>
        </div>
      </div>
      <div className="transaction-details-page__header-buttons-wrapper">
        <Button className="transaction-details-page__header-button" variant="primary">Approve</Button>
        <Button className="transaction-details-page__header-button" variant="delete">Block</Button>
        <Button className="transaction-details-page__header-button" variant="primary">Escalate</Button>
      </div>

      <div className="transaction-details-page__top-wrapper">
        <div className="transaction-details-page__top-left-wrapper">
          <Typography variant="h2" className="transaction-details-page__top-header">Overview</Typography>
          <div className="transaction-details-page__overview-wrapper">
            <DetailsCard className="transaction-details-page__overview-card" topHeader="Location" bottomHeader="TOWN HALL" bottomText="USA" />
            <DetailsCard className="transaction-details-page__overview-card" topHeader="Device" bottomHeader="MOBILE APP" bottomText="iPhone 16" />
            <DetailsCard className="transaction-details-page__overview-card" topHeader="E-mail" bottomHeader="jane@gmail.com" bottomText="CONFIRMED" />
          </div>
        </div>
        <div className="transaction-details-page__top-right-wrapper">
          <div className="transaction-details-page__prob-score">
            <Typography variant="p2" className="transaction-details-page__prob-score-header">Fraud Probablity Score</Typography>
            <Typography variant="h2" className="transaction-details-page__prob-score-text">82.34%</Typography>
          </div>
          <div className="transaction-details-page__status">
            <Typography variant="p2" className="transaction-details-page__status-header">Status:</Typography>
            <Typography variant="h2" className="transaction-details-page__status-text">Under Review</Typography>
          </div>
        </div>
      </div>

      <div className="transaction-details-page__bottom-wrapper">
        <div className="transaction-details-page__bottom-left-wrapper">
          <AccountSummaryCard />
          <OrderDetailsCard />
        </div>
        <div className="transaction-details-page__bottom-right-wrapper">
          <NotesThread />
        </div>
      </div>
    </main>
  );
}

export default TransactionDetailsPage;