import "./TransactionList.scss";
import { useNavigate } from "react-router-dom";
import TransactionCard from "../TransactionCard/TransactionCard";

const TransactionList = ({ transactions }) => {
  const navigate = useNavigate();

  // Handle loading or unexpected shapes
  if (!Array.isArray(transactions)) {
    return <p>Loading transactions...</p>;
  }

  // Limit the number rendered
  const limited = transactions.slice(0, 30);

  if (limited.length === 0) {
    return <p>No transactions found.</p>;
  }

  return (
    <div className="transaction-list">
      {limited.map((tx) => (
        <TransactionCard
          key={tx.id}
          transaction={tx}
          onClick={() => navigate(`/transactions/${tx.id}`)}
        />
      ))}
    </div>
  );
};

export default TransactionList;