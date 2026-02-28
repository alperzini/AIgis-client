import { useState } from "react";
import "./TransactionCard.scss";
import EditIcon from "../../assets/icons/edit-24px.svg";

const TransactionCard = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const risk = transaction.risk_band?.toLowerCase();
  const riskClass = `transaction-card--${risk}`;

  return (
    <div className={`transaction-card ${riskClass}`}>
      
      {/* Header */}
      <div className="transaction-card__header">

        <h3 className="transaction-card__id">
          Account ID: {transaction.id}
        </h3>

        <p className="transaction-card__amount">
          ${transaction.amount}
        </p>

        <span className="transaction-card__risk-pill">
          {transaction.risk_band}
        </span>

        <p className="transaction-card__status">
          {transaction.recommended_action}
        </p>

        {/* edit button */}
        <button
          type="button"
          className="transaction-card__icon-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={`Edit transaction ${transaction.id}`}
        >
          <img src={EditIcon} alt="Edit" />
        </button>

      </div>

      {/* expanded section */}
      {isExpanded && (
        <div className="transaction-card__expanded">

          <div className="transaction-card__flag">
            <strong>AIGis Flagged: Highlight which item pinged the flag</strong> 
          </div>

          {/* action buttons */}
          <div className="transaction-card__actions">
            <button className="btn btn--approve">Approve</button>
            <button className="btn btn--block">Block</button>
            <button className="btn btn--escalate">Escalate</button>
          </div>

          {/* escalation fields */}
          <div className="transaction-card__escalation">

            <div className="field">
              <label>Notify</label>
              <select>
                <option>Please select</option>
              </select>
            </div>

            <div className="field">
              <label>Reasoning for Escalation</label>
              <select>
                <option>Please select</option>
              </select>
            </div>

            <div className="field">
              <label>Comments</label>
              <input type="text" placeholder="Item Name" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;