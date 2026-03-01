import "./DetailsCard.scss";
import Typography from "../Typography/Typography";

const DetailsCard = ({ topHeader, bottomHeader, bottomText, className, ...props }) => {
    return (
        <div className={`details-card ${className || ""}`} {...props}>

            <div className="details-card__top-wrapper">
                <Typography variant="h3" className="details-card__top-header">{topHeader}</Typography>
            </div>
            <div className="details-card__bottom-wrapper">
                <Typography variant="h3" className="details-card__bottom-header">{bottomHeader}</Typography>
                <Typography variant="p2" className="details-card__bottom-text">{bottomText}</Typography>
            </div>
        </div>
    );
}

export default DetailsCard;