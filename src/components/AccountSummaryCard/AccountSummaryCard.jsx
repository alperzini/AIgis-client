import "./AccountSummaryCard.scss";

function AccountSummaryCard() {
return (
    <section className="acct-card" aria-label="Account Summary">
    <header className="acct-card__header">
        <h2 className="acct-card__title">Account Summary</h2>
    </header>

    <div className="acct-card__body">
        <div className="acct-card__cell">
        <div className="acct-card__label">Card</div>
        <div className="acct-card__value acct-card__value--mono">*****3456</div>
        </div>

        <div className="acct-card__divider" />

        <div className="acct-card__cell acct-card__cell--right">
        <div className="acct-card__label">Amount</div>
        <div className="acct-card__value acct-card__value--strong">$12446.00</div>
        </div>
    </div>
    </section>
);
}

export default AccountSummaryCard;