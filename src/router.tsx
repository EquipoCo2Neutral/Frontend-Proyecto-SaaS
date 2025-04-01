import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateTenantView from "./views/Inquilinos/CreateTenantView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/inquilinos/create" element={<CreateTenantView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
