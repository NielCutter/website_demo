import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminDashboard } from "./components/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
