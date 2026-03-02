
import { useState } from "react";
import "./TransactionCard.scss";
import EditIcon from "../../assets/icons/edit-24px.svg";
import DetailsIcon from "../../assets/icons/chevron_right-24px.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const TransactionCard = ({ transaction }) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(transaction.status || "");

  const [notifyValue, setNotifyValue] = useState("");
  const [reasonValue, setReasonValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const [modalState, setModalState] = useState({
    open: false,
    type: null,
  });

  const [escalateError, setEscalateError] = useState("");

  const risk = transaction.risk_band?.toLowerCase();
  const riskClass = `transaction-card--${risk}`;

  const effectiveStatus = (status || transaction.status || "").toLowerCase();

  let statusClass = "";
  if (effectiveStatus === "user approved") {
    statusClass = "transaction-card--user-approved";
  } else if (effectiveStatus === "user blocked") {
    statusClass = "transaction-card--user-blocked";
  } else if (effectiveStatus === "pending review") {
    statusClass = "transaction-card--pending-review";
  }

  const recommended = transaction.recommended_action?.toLowerCase();
  const riskBand = transaction.risk_band?.toLowerCase();

  const hasUserDecision =
    effectiveStatus === "user approved" ||
    effectiveStatus === "user blocked" ||
    effectiveStatus === "pending review";

  const canEdit =
    recommended === "allow" && riskBand === "medium" && !hasUserDecision;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const formatAccountId = (uuid) => {
    if (!uuid) return "";
    return uuid.split("-")[0].toUpperCase();
  };

  const getDisplayStatus = () => {
    if (effectiveStatus === "user approved") return "User Approved";
    if (effectiveStatus === "user blocked") return "User Blocked";
    if (effectiveStatus === "pending review") return "Pending Review";

    const rec = recommended;
    const riskLevel = riskBand;

    if (rec === "block") return "Auto Blocked";

    if (rec === "allow") {
      if (riskLevel === "medium") return "Open for User Review";
      if (riskLevel === "low") return "Auto Approved";
      if (riskLevel === "high") return "";
    }

    return transaction.recommended_action;
  };

  const modalTitle =
    modalState.type === "approve"
      ? "Approve Transaction"
      : modalState.type === "block"
      ? "Block Transaction"
      : modalState.type === "escalate"
      ? "Escalate Transaction"
      : "";

  const modalMessage =
    modalState.type === "approve"
      ? "Are you sure you want to approve this transaction? This will be marked as User Approved."
      : modalState.type === "block"
      ? "Are you sure you want to block this transaction? This will be marked as User Blocked."
      : modalState.type === "escalate"
      ? "Are you sure you want to escalate this transaction for review?"
      : "";

  const modalConfirmLabel =
    modalState.type === "approve"
      ? "Yes, Approve"
      : modalState.type === "block"
      ? "Yes, Block"
      : modalState.type === "escalate"
      ? "Yes, Escalate"
      : "Confirm";

  const openModal = (type) => {
    setModalState({ open: true, type });
  };

  const closeModal = () => {
    setModalState({ open: false, type: null });
    setEscalateError("");
  };

  const handleConfirm = async () => {
    try {
      if (modalState.type === "approve") {
        await axios.patch(`${baseUrl}/transactions/${transaction.id}`, {
          status: "User Approved",
        });
        setStatus("User Approved");
      } else if (modalState.type === "block") {
        await axios.patch(`${baseUrl}/transactions/${transaction.id}`, {
          status: "User Blocked",
        });
        setStatus("User Blocked");
      } else if (modalState.type === "escalate") {
        if (!notifyValue || !reasonValue) {
          setEscalateError(
            "Please select Notify and Reasoning for Escalation before submitting."
          );
          return; // keep modal open
        }

        await axios.patch(`${baseUrl}/transactions/${transaction.id}`, {
          status: "Pending Review",
          notify: notifyValue,
          escalation_reason: reasonValue,
          comment: commentValue,
        });
        setStatus("Pending Review");
      }
    } catch (err) {
      console.error("Failed to update transaction", err);
    } finally {
      if (modalState.type !== "escalate" || (notifyValue && reasonValue)) {
        closeModal();
        setIsExpanded(false);
      }
    }
  };

  const handleApproveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("approve");
  };

  const handleBlockClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("block");
  };

  const handleEscalateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEscalateError("");
    openModal("escalate");
  };

  return (
    <>
      <div className={`transaction-card ${riskClass} ${statusClass}`}>
        <div className="transaction-card__header">
          <div className="transaction-card__details-btn-wrapper">
            <button
              type="button"
              className="transaction-card__details-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/transactions/${transaction.id}`);
              }}
            >
              <img
                src={DetailsIcon}
                alt="View details"
                className="transaction-card__chevron-icon"
              />
            </button>
          </div>

          <h3 className="transaction-card__id">{formatAccountId(transaction.id)}</h3>
          <p className="transaction-card__date">
            {formatDate(transaction.transaction_datetime)}
          </p>
          <p className="transaction-card__amount">${transaction.amount}</p>

          <span
            className={`transaction-card__risk-pill transaction-card__risk-pill--${transaction.risk_band.toLowerCase()}`}
          >
            {transaction.risk_band.toUpperCase()}
          </span>

          <p className="transaction-card__status">{getDisplayStatus()}</p>

          <div className="transaction-card__button-field">
            {canEdit && (
              <button
                type="button"
                className="transaction-card__icon-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded((prev) => !prev);
                }}
                aria-label={`Edit transaction ${transaction.id}`}
              >
                <img src={EditIcon} alt="Edit" />
                <span className="transaction-card__icon-btn--edit-text">Edit</span>
              </button>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="transaction-card__expanded">
            <div className="transaction-card__flag">
              <span>
                AIG is Flagged: If the decision isn’t clear, escalate the transaction
                for further review, or proceed to Approve or Block.
              </span>
              <p className="pca-description">
                Our AI uses Principal Component Analysis (PCA) to identify unusual
                patterns across multiple transaction variables. PCA doesn’t guess — it
                highlights statistically meaningful anomalies based on real behavioral
                trends, helping you make confident escalation decisions.
              </p>

              <div className="transaction-card__actions">
                <button className="active-btn active-btn--approve" onClick={handleApproveClick}>
                  Approve
                </button>

                <button className="active-btn active-btn--block" onClick={handleBlockClick}>
                  Block
                </button>

                <button className="active-btn active-btn--escalate" onClick={handleEscalateClick}>
                  Escalate
                </button>
              </div>

              {escalateError ? (
                <p className="transaction-card__error" role="alert">
                  {escalateError}
                </p>
              ) : null}
            </div>

            <div className="transaction-card__escalation">
              <div className="transaction-card__escalation__field">
                <label>Notify</label>
                <select
                  value={notifyValue}
                  className="transaction-card__escalation__field--input"
                  onChange={(e) => setNotifyValue(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="fraud_team">Fraud Team</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="risk_analyst">Risk Analyst</option>
                </select>
              </div>

              <div className="transaction-card__escalation__field">
                <label>Reasoning for Escalation</label>
                <select
                  value={reasonValue}
                  className="transaction-card__escalation__field--input"
                  onChange={(e) => setReasonValue(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="pattern">Suspicious Pattern</option>
                  <option value="value">High-Value Transaction</option>
                  <option value="location">Location Mismatch</option>
                </select>
              </div>

              <div className="transaction-card__escalation__field">
                <label>Comments</label>
                <input
                  type="text"
                  placeholder="Additional Details"
                  className="transaction-card__escalation__field--input"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={modalState.open}
        title={modalTitle}
        message={modalMessage}
        confirmLabel={modalConfirmLabel}
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </>
  );
};

export default TransactionCard;