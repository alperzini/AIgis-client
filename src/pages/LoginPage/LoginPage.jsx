import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { isAuthed, signIn } from "../../utils/auth";
import UserBadge from "../../components/UserBadge/UserBadge";
import Footer from "../../components/Footer/Footer";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "AIgis";
    if (isAuthed()) navigate("/", { replace: true });
  }, [navigate]);

  const handleEnter = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      signIn();
      navigate("/", { replace: true });
    }, 900);
  };

  return (
    <div>
    <main className="login">
      <section className="login__card">
        <div className="login__brand">
          <BrandLogo />
        </div>

        <div className="login__user">
          <UserBadge />
        </div>

        <div className="login__actions">
          <button
            type="button"
            className="login__btn"
            onClick={handleEnter}
            disabled={loading}
            aria-busy={loading}
          >
            {loading && <span className="spinner" />}
            {loading ? "Signing in..." : "Enter Dashboard"}
          </button>
        </div>
      </section>
    </main>

<Footer />
</div>


  );
}

export default LoginPage;