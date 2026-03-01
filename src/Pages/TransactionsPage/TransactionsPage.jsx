import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionsPage.scss";
import TransactionList from "../../components/TransactionList/TransactionList";

function TransactionsPage({ transactions, setTransactions }) {
    return (
        <main className="transactions-page">
            <h1 className="transactions-page__title">Transactions</h1>
            <p className="transactions-page__text">
                Filters + transaction cards will go here.
            </p>
            <TransactionList transactions={transactions} setTransactions={setTransactions} />
        </main>
    );
}

export default TransactionsPage;