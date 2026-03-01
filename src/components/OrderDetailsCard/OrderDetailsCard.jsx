import "./OrderDetailsCard.scss";

function OrderDetailsCard() {
  return (
    <section className="order-card" aria-label="Order Details">
      <header className="order-card__header">
        <h2 className="order-card__title">Order Details</h2>
      </header>

      <div className="order-card__body">
        <div className="order-card__row">
          <div className="order-card__label">Date</div>
          <div className="order-card__value">12-02-2025</div>
        </div>

        <div className="order-card__rule" />

        <div className="order-card__row">
          <div className="order-card__label">Time since Previous Purchase</div>
          <div className="order-card__value">12:00:00 am est</div>
        </div>

        <div className="order-card__rule" />

        <div className="order-card__row">
          <div className="order-card__label">Distance From</div>
          <div className="order-card__value">000.00 mi / 000.00 km</div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetailsCard;