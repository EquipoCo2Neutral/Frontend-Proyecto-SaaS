import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateTenantView from "@/views/Inquilinos/CreateTenantView";
import EditTenantView from "./views/Inquilinos/EditTenantView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import ProtectedRoute from "./components/ProtectedRoute";
import InfoTenantView from "./views/Inquilinos/InfoTenantView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} index />
            <Route path="/inquilinos/create" element={<CreateTenantView />} />
            <Route
              path="/inquilinos/:inquilinoId/edit"
              element={<EditTenantView />}
            />
            <Route
            path="/inquilinos/:inquilinoId"
            element={<InfoTenantView />}
            />
            
          </Route>

        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
