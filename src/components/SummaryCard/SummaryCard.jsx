import "./SummaryCard.scss";
import Typography from "../Typography/Typography.jsx";

//variant = "small", "large"
//color = "green", "red", "yellow"
const SummaryCard = ({ variant = "small", header, content, color = "green" }) => {
    const isLarge = variant === "large";
    const safeVariant = isLarge ? "large" : "small";

    return (
        <div className={`summary-card summary-card--${safeVariant} ${isLarge ? `summary-card--${color}` : ""}`}>
            <Typography
                className={`summary-card__header summary-card__header--${safeVariant}`}
                variant={isLarge ? "h2" : "h3"}
            >
                {header}
            </Typography>

            <Typography
                className={`summary-card__content summary-card__content--${safeVariant}`}
                variant={isLarge ? "p1" : "p2"}
            >
                {content}
            </Typography>
        </div>
    );
};

export default SummaryCard;