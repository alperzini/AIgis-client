import "./TransactionCard.scss";

const TransactionCard = ({ transaction, onClick }) => {
  return (
    <div className="transaction-card" onClick={onClick}>
      <h3>{transaction.risk_band} Risk</h3>

      <p>Amount: ${transaction.amount}</p>
      <p>Fraud Probability:{transaction.fraud_probability}</p>
      <p>Country: {transaction.country}</p>
      <p>Device: {transaction.device}</p>
      <p>Channel: {transaction.transaction_channel}</p>

      <p>Status: {transaction.recommended_action}</p>

      <p>Date: {new Date(transaction.transaction_datetime).toLocaleString()}</p>
    </div>
  );
};

export default TransactionCard;