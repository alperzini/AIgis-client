import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AppLayout.scss";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import DashboardTopRight from "../DashboardTopRight/DashboardTopRight";
import { signOut } from "../../utils/auth";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-layout">
      <Sidebar onSignOut={handleSignOut} />

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