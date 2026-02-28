import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./DashboardPage.scss";

function DashboardPage() {
return (
    <main className="dashboard-page">
    <PageWrapper>
    <h1 className="dashboard-page__title">Dashboard</h1>
    <p className="dashboard-page__text">
        Summary + charts will go here.
    </p>
    </PageWrapper>
    </main>
);
}

export default DashboardPage;