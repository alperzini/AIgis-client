import "./RiskBreakdownCard.scss";
import riskLevel from "../../assets/charts/RiskLevel.png";

function RiskBreakdownCard() {
  return (
    <div className="risk-breakdown-card">
      <h2 className="risk-breakdown-card__title">
        Risk Alert Breakdown
      </h2>

      <div className="risk-breakdown-card__body">
        <img
          src={riskLevel}
          alt="Risk Alert Breakdown"
          className="risk-breakdown-card__img"
        />
      </div>
    </div>
  );
}

export default RiskBreakdownCard;