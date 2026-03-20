import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import DashboardPage from './Pages/DashboardPage';
import ReportIssuePage from './Pages/ReportIssuePage';
import SecretaryWalkthroughPage from './Pages/SecretaryWalkthroughPage';
import WorkOrdersPage from './Pages/WorkOrdersPage';
import CompliancePage from './Pages/CompliancePage';
import ComplianceDocumentsPage from './Pages/ComplianceDocumentsPage';
import AdminInsightsPage from './Pages/AdminInsightsPage';
import RegulationCodesPage from './Pages/RegulationCodesPage';
import MobilePreviewPage from './Pages/MobilePreviewPage';
import ReportPreviewPage from './Pages/ReportPreviewPage';
import SetupCenterPage from './Pages/SetupCenterPage';

const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/secretary-walkthrough" element={<SecretaryWalkthroughPage />} />
					<Route path="/report-issue" element={<ReportIssuePage />} />
					<Route path="/work-orders" element={<WorkOrdersPage />} />
					<Route path="/compliance" element={<CompliancePage />} />
					<Route path="/compliance-documents" element={<ComplianceDocumentsPage />} />
					<Route path="/admin-insights" element={<AdminInsightsPage />} />
					<Route path="/regulation-codes" element={<RegulationCodesPage />} />
					<Route path="/setup-center" element={<SetupCenterPage />} />
					<Route path="/mobile-preview" element={<MobilePreviewPage />} />
					<Route path="/report-preview" element={<ReportPreviewPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
