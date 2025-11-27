import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AdminAuthProvider } from "./hooks/useAdminAuth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </React.StrictMode>
);