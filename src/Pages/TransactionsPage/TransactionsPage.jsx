import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./TransactionsPage.scss";
import TransactionList from "../../components/TransactionList/TransactionList";

function TransactionsPage({transactions, settransactions}) {
return (
    <main className="transactions-page">
    <PageWrapper>
    <h1 className="transactions-page__title">Transactions</h1>
    <p className="transactions-page__text">
        Filters + transaction cards will go here.
    </p>
    <TransactionList transactions={transactions} setTransactions={settransactions} />
    </PageWrapper>
    </main>
);
}

export default TransactionsPage;