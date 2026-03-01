import { useState } from "react";
import "./TransactionCard.scss";
import EditIcon from "../../assets/icons/edit-24px.svg";
import DetailsIcon from "../../assets/icons/chevron_right-24px.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const baseUrl = import.meta.env.VITE_API_BASE_URL; // e.g. http://localhost:8080

const TransactionCard = ({ transaction }) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  // Local status state, initialized from DB
  const [status, setStatus] = useState(transaction.status || "");

  // Escalation form state
  const [notifyValue, setNotifyValue] = useState("");
  const [reasonValue, setReasonValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  // Confirm modal
  const [modalState, setModalState] = useState({
    open: false,
    type: null, // "approve" | "block" | "escalate"
  });

  // Base risk class
  const risk = transaction.risk_band?.toLowerCase();
  const riskClass = `transaction-card--${risk}`;

  // Effective status (prefer local state, fallback to DB)
  const effectiveStatus = (status || transaction.status || "").toLowerCase();

  // Extra classes based on user decision
  let statusClass = "";
  if (effectiveStatus === "user approved") {
    statusClass = "transaction-card--user-approved";
  } else if (effectiveStatus === "user blocked") {
    statusClass = "transaction-card--user-blocked";
  } else if (effectiveStatus === "pending review") {
    statusClass = "transaction-card--pending-review";
  }

  // canEdit: only auto Allow + Medium AND no user decision yet
  const recommended = transaction.recommended_action?.toLowerCase();
  const riskBand = transaction.risk_band?.toLowerCase();

  const hasUserDecision =
    effectiveStatus === "user approved" ||
    effectiveStatus === "user blocked" ||
    effectiveStatus === "pending review";

  const canEdit = recommended === "allow" && riskBand === "medium" && !hasUserDecision;

  //Formatting helpers 

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

  // Status label — prefers status from DB/local, falls back to auto logic
  const getDisplayStatus = () => {
    // 1) If user already decided, always show that
    if (effectiveStatus === "user approved") return "User Approved";
    if (effectiveStatus === "user blocked") return "User Blocked";
    if (effectiveStatus === "pending review") return "Pending Review";

    // 2) Otherwise fall back to original automatic logic
    const rec = recommended;
    const riskLevel = riskBand;

    if (rec === "block") {
      return "Auto Blocked";
    }

    if (rec === "allow") {
      if (riskLevel === "medium") {
        return "Open for User Review";
      }
      if (riskLevel === "low") {
        return "Auto Approved";
      }
      if (riskLevel === "high") {
        return "";
      }
    }

    return transaction.recommended_action;
  };

  // Modal config text 

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

  //Modal handlers

  const openModal = (type) => {
    setModalState({ open: true, type });
  };

  const closeModal = () => {
    setModalState({ open: false, type: null });
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
      // Close modal and collapse the dropdown after confirming
      closeModal();
      setIsExpanded(false);
    }
  };

  // Button click handlers

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

    if (!notifyValue || !reasonValue) {
      alert("Please select Notify and Reasoning for Escalation before escalating.");
      return;
    }

    openModal("escalate");
  };

  return (
    <>
      {/* Card */}
      <div className={`transaction-card ${riskClass} ${statusClass}`}>
        {/* Header */}
        <div className="transaction-card__header">
          {/* Details chevron */}
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

          <h3 className="transaction-card__id">
            {formatAccountId(transaction.id)}
          </h3>

          <p className="transaction-card__date">
            {formatDate(transaction.transaction_datetime)}
          </p>

          <p className="transaction-card__amount">
            ${transaction.amount}
          </p>

          <span
            className={`transaction-card__risk-pill transaction-card__risk-pill--${transaction.risk_band.toLowerCase()}`}
          >
            {transaction.risk_band.toUpperCase()}
          </span>

          <p className="transaction-card__status">
            {getDisplayStatus()}
          </p>

          {/* edit button – only show if canEdit is true */}
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
                <span className="transaction-card__icon-btn--edit-text">
                  Edit
                </span>
              </button>
            )}
          </div>
        </div>

        {/* expanded section */}
        {isExpanded && (
          <div className="transaction-card__expanded">
            <div className="transaction-card__flag">
              <span>AIGis Flagged: Highlight which item pinged the flag</span>

              {/* action buttons */}
              <div className="transaction-card__actions">
                <button
                  className="active-btn active-btn--approve"
                  onClick={handleApproveClick}
                >
                  Approve
                </button>

                <button
                  className="active-btn active-btn--block"
                  onClick={handleBlockClick}
                >
                  Block
                </button>

                <button
                  className="active-btn active-btn--escalate"
                  onClick={handleEscalateClick}
                >
                  Escalate
                </button>
              </div>
            </div>

            {/* escalation fields */}
            <div className="transaction-card__escalation">
              <div className="field">
                <label>Notify</label>
                <select
                  value={notifyValue}
                  onChange={(e) => setNotifyValue(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="fraud_team">Fraud Team</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="risk_analyst">Risk Analyst</option>
                </select>
              </div>

              <div className="field">
                <label>Reasoning for Escalation</label>
                <select
                  value={reasonValue}
                  onChange={(e) => setReasonValue(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="pattern">Suspicious Pattern</option>
                  <option value="value">High-Value Transaction</option>
                  <option value="location">Location Mismatch</option>
                </select>
              </div>

              <div className="field">
                <label>Comments</label>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm modal */}
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