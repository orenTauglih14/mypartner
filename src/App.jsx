import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/globals.css';
import './components/AppHeader.css';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import WelcomePage         from './pages/WelcomePage';
import LoginPage           from './pages/LoginPage';
import RegisterPage        from './pages/RegisterPage';
import OnboardingPage      from './pages/OnboardingPage';
import DashboardPage       from './pages/DashboardPage';
import LeadsPage           from './pages/LeadsPage';
import CustomersPage       from './pages/CustomersPage';
import CalendarPage        from './pages/CalendarPage';
import QuotesPage          from './pages/QuotesPage';
import CreateQuotePage     from './pages/CreateQuotePage';
import QuotePreviewPage    from './pages/QuotePreviewPage';
import PaymentsPage        from './pages/PaymentsPage';
import CollectionsPage     from './pages/CollectionsPage';
import RemindersPage       from './pages/RemindersPage';
import InvoicesPage        from './pages/InvoicesPage';
import InvoicePreviewPage  from './pages/InvoicePreviewPage';
import PricingPage         from './pages/PricingPage';
import MorePage            from './pages/MorePage';
import AgentPage           from './pages/AgentPage';
import SuppliersPage       from './pages/SuppliersPage';
import InventoryPage       from './pages/InventoryPage';
import PurchaseOrdersPage  from './pages/PurchaseOrdersPage';
import MessagesPage        from './pages/MessagesPage';

function Protected({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/"           element={<WelcomePage />} />
            <Route path="/login"      element={<LoginPage />} />
            <Route path="/register"   element={<RegisterPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/pricing"    element={<PricingPage />} />

            {/* Protected — core */}
            <Route path="/dashboard"       element={<Protected><DashboardPage /></Protected>} />
            <Route path="/leads"           element={<Protected><LeadsPage /></Protected>} />
            <Route path="/customers"       element={<Protected><CustomersPage /></Protected>} />
            <Route path="/calendar"        element={<Protected><CalendarPage /></Protected>} />
            <Route path="/quotes"          element={<Protected><QuotesPage /></Protected>} />
            <Route path="/create-quote"    element={<Protected><CreateQuotePage /></Protected>} />
            <Route path="/quote-preview"   element={<Protected><QuotePreviewPage /></Protected>} />
            <Route path="/payments"        element={<Protected><PaymentsPage /></Protected>} />
            <Route path="/collections"     element={<Protected><CollectionsPage /></Protected>} />
            <Route path="/reminders"       element={<Protected><RemindersPage /></Protected>} />
            <Route path="/invoices"        element={<Protected><InvoicesPage /></Protected>} />
            <Route path="/invoice-preview" element={<Protected><InvoicePreviewPage /></Protected>} />
            <Route path="/more"            element={<Protected><MorePage /></Protected>} />

            {/* Protected — new */}
            <Route path="/agent"           element={<Protected><AgentPage /></Protected>} />
            <Route path="/suppliers"       element={<Protected><SuppliersPage /></Protected>} />
            <Route path="/inventory"       element={<Protected><InventoryPage /></Protected>} />
            <Route path="/purchase-orders" element={<Protected><PurchaseOrdersPage /></Protected>} />
            <Route path="/messages"        element={<Protected><MessagesPage /></Protected>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
