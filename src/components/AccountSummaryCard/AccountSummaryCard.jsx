import "./AccountSummaryCard.scss";
import Typography from "../Typography/Typography";

function AccountSummaryCard({
  cardLabel = "Card",
  cardValue = "*****3456",
  amountLabel = "Amount",
  amountValue = "$1,446.84",
}) {
  return (
    <section className="acct-card" aria-labelledby="acct-card-title">
      <header className="acct-card__header">
        <Typography
          variant="h3"
          as="h2"
          className="acct-card__title"
          id="acct-card-title"
        >
          Account Summary
        </Typography>
      </header>

      <div className="acct-card__body">
        <div className="acct-card__cell">
          <Typography variant="p2" as="div" className="acct-card__label">
            {cardLabel}
          </Typography>

          <Typography variant="h3" as="div" className="acct-card__value acct-card__value--mono">
            {cardValue}
          </Typography>
        </div>

        <div className="acct-card__divider" aria-hidden="true" />

        <div className="acct-card__cell acct-card__cell--right">
          <Typography variant="p2" as="div" className="acct-card__label">
            {amountLabel}
          </Typography>

          <Typography variant="h1" as="div" className="acct-card__value acct-card__value--strong">
            {amountValue}
          </Typography>
        </div>
      </div>
    </section>
  );
}

export default AccountSummaryCard;