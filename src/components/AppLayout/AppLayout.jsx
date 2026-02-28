import "./AppLayout.scss";
import Navigation from "../Navigation/Navigation";

function AppLayout({ children }) {
return (
    <div className="layout">
    <aside className="layout__sidebar">
        <Navigation />
    </aside>

    <div className="layout__content">
        <div className="layout__content-inner">{children}</div>
    </div>
    </div>
);
}

export default AppLayout;