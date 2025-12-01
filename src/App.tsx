import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminDashboard } from "./components/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/p0rtf0li0" element={<PortfolioPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
