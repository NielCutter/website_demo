import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import "./styles/portfolio-extra.css";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PortfolioExtraPage } from "./pages/PortfolioExtraPage";
import { IRMPage } from "./pages/IRMPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { ProfitCalculatorPage } from "./pages/admin/ProfitCalculatorPage";
import { ProfitDashboardPage } from "./pages/admin/ProfitDashboardPage";
import { ProfitAdminSettingsPage } from "./pages/admin/ProfitAdminSettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/portfolio" element={<PortfolioExtraPage />} />
        <Route path="/p0rtf0li0" element={<PortfolioExtraPage />} />
        <Route path="/irm" element={<IRMPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profit/calculator"
          element={
            <ProtectedRoute>
              <ProfitCalculatorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profit/dashboard"
          element={
            <ProtectedRoute>
              <ProfitDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profit/settings"
          element={
            <ProtectedRoute>
              <ProfitAdminSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
