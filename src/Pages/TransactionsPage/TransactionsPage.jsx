import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionsPage.scss";
import TransactionList from "../../components/TransactionList/TransactionList";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import Typography from "../../components/Typography/Typography";
import TableRowHeader from "../../components/TableRowHeader/TableRowHeader";

function TransactionsPage({ transactions, setTransactions }) {

    const headers = [
        { label: "Transaction ID", key: "id", flex: 1 },
        { label: "Time", key: "time", flex: 1.5 },
        { label: "Amount", key: "amount", flex: 1 },
        { label: "Risk Level", key: "risk", flex: 0.75 },
        { label: "Status", key: "status", flex: 2 },
    ];

    return (
        <main className="transactions-page">
            <h1 className="transactions-page__title">Transactions</h1>
            <div className="transactions-page__cards-wrapper">
                <SummaryCard variant="large" header="AIgis Approved" content="284,302" color="green" />
                <SummaryCard variant="large" header="Pending Review" content="419" color="yellow" />
                <SummaryCard variant="large" header="AIgis Blocked" content="86" color="red" />
            </div>
            <div className="transactions-page__table-prefix">
                <select
                    id="time-range"
                    name="timeRange"
                    className="transactions-page__select"
                    aria-label="time-range"
                    onChange={(e) => console.log("Selected:", e.target.value)}
                >
                    <option value="1h">Past 1 hour</option>
                    <option value="24h">Past 24 hours</option>
                    <option value="1w">Past week</option>
                    <option value="1m">Past month</option>
                </select>
                <Typography className="transactions-page__list-summary" variant="h3">Showing All of 20 results</Typography>
            </div>
            <TableRowHeader headers={headers} data={transactions} setData={setTransactions} />
            <TransactionList transactions={transactions} setTransactions={setTransactions} />
        </main>
    );
}

export default TransactionsPage;