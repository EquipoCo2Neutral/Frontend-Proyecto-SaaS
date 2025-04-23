import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateTenantView from "@/views/Inquilinos/CreateTenantView";
import EditTenantView from "./views/Inquilinos/EditTenantView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import ProtectedRoute from "./components/ProtectedRoute";
import InfoTenantView from "./views/Inquilinos/InfoTenantView";
import HomeView from "./views/HomeView";
import ProtectedRouteUsers, {
  ProtectedRouteGestor,
} from "./components/ProtectedRouteUsers";
import LoginUsersView from "./views/auth/LoginUsersView";
import RegisterUsersView from "./views/auth/RegisterUsersView";
import ConfirmAccountUsers from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import InfoPlantasView from "./views/Admin-inquilino/InfoPlantasView";
import HomeManager from "./views/gestor/HomeManager";
import PlantsManagersView from "./views/gestor/PlantsManagersView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PARA EL EQUIPO SAAS PROTEGIDAS */}
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
        {/* RUTAS PARA ADMINISTRADOR INQUILINO PROTEGIDAS */}
        <Route element={<ProtectedRouteUsers />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomeView />} index />
            <Route path="/plants" element={<InfoPlantasView />} index />
          </Route>
        </Route>
        {/* RUTAS PARA GESTOR PROTEGIDAS */}
        <Route element={<ProtectedRouteGestor />}>
          <Route element={<AppLayout />}>
            <Route path="/gestor/home" element={<HomeManager />} index />
            <Route
              path="/gestor/planta/:plantaId"
              element={<PlantsManagersView />}
              index
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/login-users" element={<LoginUsersView />} />
          <Route path="/auth/register-users" element={<RegisterUsersView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountUsers />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
