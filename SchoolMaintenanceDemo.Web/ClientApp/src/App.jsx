import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './Pages/DashboardPage';
import ReportIssuePage from './Pages/ReportIssuePage';
import WorkOrdersPage from './Pages/WorkOrdersPage';
import CompliancePage from './Pages/CompliancePage';
import AdminInsightsPage from './Pages/AdminInsightsPage';
import RegulationCodesPage from './Pages/RegulationCodesPage';

const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/report-issue" element={<ReportIssuePage />} />
					<Route path="/work-orders" element={<WorkOrdersPage />} />
					<Route path="/compliance" element={<CompliancePage />} />
					<Route path="/admin-insights" element={<AdminInsightsPage />} />
					<Route path="/regulation-codes" element={<RegulationCodesPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
