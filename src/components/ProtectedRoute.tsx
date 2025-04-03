import { Navigate, Outlet } from "react-router-dom";
import { isAdminSaas } from "@/utils/auth";

const ProtectedRoute = () => {
  return isAdminSaas() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
