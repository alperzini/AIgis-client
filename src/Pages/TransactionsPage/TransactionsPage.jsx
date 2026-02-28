import "./TransactionsPage.scss";
import TransactionList from "../../components/TransactionList/TransactionList";

function TransactionsPage({expenses, setExpenses}) {
return (
    <main className="transactions-page">
    <h1 className="transactions-page__title">Transactions</h1>
    <p className="transactions-page__text">
        Filters + transaction cards will go here.
    </p>
    <TransactionList transactions={expenses} setTransactions={setExpenses} />
    </main>
);
}

export default TransactionsPage;