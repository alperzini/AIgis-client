import "./DashboardPage.scss";
import AlertVolumeCard from "../../components/AlertVolumeCard/AlertVolumeCard";
import RiskBreakdownCard from "../../components/RiskBreakdownCard/RiskBreakdownCard";

function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-page__header">
        <h1 className="dashboard-page__title">AIgis Overview</h1>
      </div>

      <div className="dashboard-page__charts">
        <AlertVolumeCard />
        <RiskBreakdownCard />
      </div>
    </main>
  );
}

export default DashboardPage;