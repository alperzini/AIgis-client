import "./DashboardPage.scss";
import AlertVolumeCard from "../../components/AlertVolumeCard/AlertVolumeCard";
import RiskBreakdownCard from "../../components/RiskBreakdownCard/RiskBreakdownCard";
import NotesThread from "../../components/NotesThread/NotesThread";
import OrderDetailsCard from "../../components/OrderDetailsCard/OrderDetailsCard";
import AccountSummaryCard from "../../components/AccountSummaryCard/AccountSummaryCard";

function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-page__header">
        <h1 className="dashboard-page__title">AIgis Overview</h1>
      </div>

      <div className="dashboard-page__charts">
        <AlertVolumeCard />
        <RiskBreakdownCard />

        {/* Testing */}
        <AccountSummaryCard/>
        <OrderDetailsCard/>
        <NotesThread />

      </div>
    </main>
  );
}

export default DashboardPage;