import "./UserBadge.scss";
import profileIcon from "../../assets/icons/profile-icon.svg";

function UserBadge({ name = "Wes Knightley" }) {
  return (
    <div className="user-badge">
      <div className="user-badge__avatar">
        <img
          src={profileIcon}
          alt="Profile"
          className="user-badge__avatar-img"
        />
      </div>

      <div className="user-badge__info">
        <div className="user-badge__name">
          {name}
          <span className="user-badge__id">#38-101-031</span>
        </div>
        <div className="user-badge__role">
          Data Analyst II / ABC Credit Union
        </div>
      </div>
    </div>
  );
}

export default UserBadge;