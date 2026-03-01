import "./OrderDetailsCard.scss";
import Typography from "../Typography/Typography";

function OrderDetailsCard({
  date = "12-02-2025",
  timeSince = "12:00:00 a.m.",
  distance = "1234.00 mi",
}) {
  return (
    <section className="order-card" aria-labelledby="order-card-title">
      <header className="order-card__header">
        <Typography
          variant="h3"
          as="h2"
          className="order-card__title"
          id="order-card-title"
        >
          Order Details
        </Typography>
      </header>

      <div className="order-card__body">
        <div className="order-card__row">
          <Typography variant="p4" as="div" className="order-card__label">
            Date
          </Typography>
          <Typography variant="h3" as="div" className="order-card__value">
            {date}
          </Typography>
        </div>

        <div className="order-card__rule" aria-hidden="true" />

        <div className="order-card__row">
          <Typography variant="p4" as="div" className="order-card__label">
            Last Purchase
          </Typography>
          <Typography variant="h3" as="div" className="order-card__value">
            {timeSince}
          </Typography>
        </div>

        <div className="order-card__rule" aria-hidden="true" />

        <div className="order-card__row">
          <Typography variant="p4" as="div" className="order-card__label">
            Distance
          </Typography>
          <Typography variant="h3" as="div" className="order-card__value">
            {distance}
          </Typography>
        </div>
      </div>
    </section>
  );
}

export default OrderDetailsCard;