import "./AlertVolumeCard.scss";
import volumeTrend from "../../assets/charts/VolumeTend.png";

function AlertVolumeCard() {
  return (
    <div className="alert-volume-card">
      <h2 className="alert-volume-card__title">
        Alert Volume Trend
      </h2>

      <div className="alert-volume-card__body">
        <img
          src={volumeTrend}
          alt="Alert Volume Trend"
          className="alert-volume-card__img"
        />
      </div>
    </div>
  );
}

export default AlertVolumeCard;