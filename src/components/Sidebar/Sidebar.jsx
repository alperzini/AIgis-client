import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import BrandLogo from "../BrandLogo/BrandLogo";
import SearchField from "../SearchField/SearchField";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import transactionIcon from "../../assets/icons/transaction.svg";
import signOutIcon from "../../assets/icons/sign-out.svg";

function Sidebar({ onSignOut }) {
  const getLinkClass = ({ isActive }) =>
    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`;

  const getRailClass = ({ isActive }) =>
    `sidebar__rail-btn ${isActive ? "sidebar__rail-btn--active" : ""}`;

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar__rail" aria-label="Quick navigation">
        <nav className="sidebar__rail-nav" aria-label="Primary (icons)">
          <NavLink to="/" end className={getRailClass} aria-label="Dashboard">
            <img className="sidebar__rail-icon" src={dashboardIcon} alt="" />
          </NavLink>

          <NavLink
            to="/transactions"
            className={getRailClass}
            aria-label="Transactions"
          >
            <img className="sidebar__rail-icon" src={transactionIcon} alt="" />
          </NavLink>
        </nav>

        <div className="sidebar__rail-signout">
          <button
            type="button"
            className="sidebar__rail-btn sidebar__rail-btn--signout"
            onClick={onSignOut}
            aria-label="Sign out"
          >
            <img className="sidebar__rail-icon" src={signOutIcon} alt="" />
          </button>

          <div className="sidebar__tip" role="tooltip">
            Sign out
          </div>
        </div>
      </div>

      <div className="sidebar__panel">
        <div className="sidebar__top">
          <BrandLogo />

          <SearchField
            placeholder="Search..."
            onChange={() => {}}
            value=""
            variant="light"
          />

          <nav className="sidebar__nav" aria-label="Primary (labels)">
            <NavLink to="/" end className={getLinkClass}>
              <span className="sidebar__text">Dashboard</span>
            </NavLink>

            <NavLink to="/transactions" className={getLinkClass}>
              <span className="sidebar__text">Transactions</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;