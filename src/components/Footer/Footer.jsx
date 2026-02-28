import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {new Date().getFullYear()} Algis Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;