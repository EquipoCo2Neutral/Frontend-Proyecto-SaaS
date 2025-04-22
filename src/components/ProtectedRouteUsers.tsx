import { Navigate, Outlet } from "react-router-dom";
import { isAdminInquilino, isGestor } from "@/utils/auth";

const ProtectedRouteUsers = () => {
  return isAdminInquilino() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login-users" replace />
  );
};

export default ProtectedRouteUsers;

export function ProtectedRouteGestor() {
  return isGestor() ? <Outlet /> : <Navigate to="/auth/login-users" replace />;
}
