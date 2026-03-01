import { Outlet, useLocation } from "react-router-dom";
import "./AppLayout.scss";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import DashboardTopRight from "../DashboardTopRight/DashboardTopRight";

function AppLayout() {
  const location = useLocation();

  return (
    <div className="app-layout">
      <Sidebar onSignOut={() => console.log("sign out")} />

      <div className="app-layout__right">
        <header className="app-layout__header">
          <DashboardTopRight />
        </header>

        <main className="app-layout__content">
          <div key={location.pathname} className="app-layout__page">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;