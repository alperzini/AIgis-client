import "./DashboardTopRight.scss";
import UserBadge from "../UserBadge/UserBadge";
import NotificationButton from "../NotificationButton/NotificationButton";

function DashboardTopRight() {
  const notifications = [
    { id: "1", title: "Risk threshold updated", meta: "2 min ago" },
    { id: "2", title: "New fraud case detected", meta: "15 min ago" },
  ];

  return (
    <div className="top-right">
      <UserBadge />
      <NotificationButton items={notifications} />
    </div>
  );
}

export default DashboardTopRight;