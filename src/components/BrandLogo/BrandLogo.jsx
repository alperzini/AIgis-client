import "./BrandLogo.scss";
import algisLogo from "../../assets/logo/AIgis.svg";

function BrandLogo() {
  return (
    <div className="brand">
      <img className="brand__mark" src={algisLogo} alt="AIgis" />
    </div>
  );
}

export default BrandLogo;