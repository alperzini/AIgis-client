import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
return (
    <header className="nav">
    <div className="nav__inner">
        <div className="nav__brand">CrossCollab</div>

        <nav className="nav__links">
        <NavLink to="/" className="nav__link">
            Dashboard
        </NavLink>
        <NavLink to="/transactions" className="nav__link">
            Transactions
        </NavLink>
        <NavLink to="/transactions" className="nav__link">
            Fraud Detection
        </NavLink>
        </nav>
    </div>
    </header>
);
}

export default Navigation;