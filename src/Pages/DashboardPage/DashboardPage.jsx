import "./DashboardPage.scss";
import AlertVolumeCard from "../../components/AlertVolumeCard/AlertVolumeCard";
import RiskBreakdownCard from "../../components/RiskBreakdownCard/RiskBreakdownCard";
import SummaryCard from "../../components/SummaryCard/SummaryCard.jsx"
import Typography from "../../components/Typography/Typography.jsx";
import TransactionList from "../../components/TransactionList/TransactionList";
import TableRowHeader from "../../components/TableRowHeader/TableRowHeader.jsx";

function DashboardPage({ transactions, setTransactions }) {

  const headers = [
    { label: "Transaction ID", key: "id", flex: 1 },
    { label: "Time", key: "time", flex: 1.5 },
    { label: "Amount", key: "amount", flex: 1 },
    { label: "Risk Level", key: "risk", flex: 0.75 },
    { label: "Status", key: "status", flex: 2 },
  ];

  const smallArray = transactions.slice(0, 3)

  return (
    <main className="dashboard-page">
      <div className="dashboard-page__top-wrapper">
        <div className="dashboard-page__header">
          <h1 className="dashboard-page__title">AIgis Overview</h1>
        </div>

        <div className="dashboard-page__charts">
          <AlertVolumeCard />
          <RiskBreakdownCard />
        </div>
        <div className="dashboard-page__summary-cards">
          <SummaryCard variant="small" header="Total Transactions" content="284,302" color="blue" />
          <SummaryCard variant="small" header="Fraud Detected" content="86" color="red" />
          <SummaryCard variant="small" header="Accuracy Rate" content="99.6%" color="green" />
          <SummaryCard variant="small" header="Alerts Today" content="12" color="cyan" />
        </div>
      </div>
      <Typography variant="h2"> Most Recent Transactions</Typography>
      <TableRowHeader headers={headers} data={transactions} setData={setTransactions} />
      <TransactionList transactions={smallArray} setTransactions={setTransactions} />
    </main>
  );
}

export default DashboardPage;