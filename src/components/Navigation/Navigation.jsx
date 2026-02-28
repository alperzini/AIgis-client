import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
return (
    <div className="nav">
    <div className="nav__brand">Algis</div>

    <div className="nav__search">
        <input className="nav__search-input" placeholder="Search..." />
    </div>

    <nav className="nav__links">
        <NavLink
        to="/"
        className={({ isActive }) =>
            `nav__link ${isActive ? "nav__link--active" : ""}`
        }
        end
        >
        Dashboard
        </NavLink>

        <NavLink
        to="/transactions"
        className={({ isActive }) =>
            `nav__link ${isActive ? "nav__link--active" : ""}`
        }
        >
        Transactions
        </NavLink>
    </nav>
    </div>
);
}

export default Navigation;