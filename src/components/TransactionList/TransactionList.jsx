import "./TransactionList.scss";
import { useNavigate } from "react-router-dom";
import TransactionCard from "../TransactionCard/TransactionCard";

const TransactionList = ({ transactions }) => {
  const navigate = useNavigate();
  const limited = transactions.slice(0, 30); // SHOW ONLY FIRST 30 EXPENSE, ADJUST THIS IF YOU WANT TO CHANGE THE AMOUNT OF EXPENSE TO RENDER

  if (!transactions || transactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  return (
    <div className="transaction-list"> {/* tx is the transaction object, tx.id is the unique identifier for each transaction */}
      {limited.map((tx) => (
        <TransactionCard 
          key={tx.id} 
          transaction={tx}
          onClick={() => navigate(`/expenses/${tx.id}`)}
        />
      ))}
    </div>
  );
};

export default TransactionList;