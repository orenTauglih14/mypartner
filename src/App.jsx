import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/globals.css';
import './components/AppHeader.css';

import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import CustomersPage from './pages/CustomersPage';
import CalendarPage from './pages/CalendarPage';
import QuotesPage from './pages/QuotesPage';
import CreateQuotePage from './pages/CreateQuotePage';
import PaymentsPage from './pages/PaymentsPage';
import CollectionsPage from './pages/CollectionsPage';
import RemindersPage from './pages/RemindersPage';
import PricingPage from './pages/PricingPage';
import MorePage from './pages/MorePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth / Onboarding */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Main app */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/create-quote" element={<CreateQuotePage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/more" element={<MorePage />} />

        {/* Standalone */}
        <Route path="/pricing" element={<PricingPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
