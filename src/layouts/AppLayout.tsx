import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiDatabase,
  FiBarChart2,
  FiBriefcase,
} from "react-icons/fi";
import { FaIndustry, FaBuilding } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [rol, setRol] = useState<string | null>(null); //estado para el rol
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { rol: string } = jwtDecode(token);
        setRol(decoded.rol);
      } catch (error) {
        console.error("Token inválido:", error);
        setRol(null);
      }
    }
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "rounded-xl p-6",
        confirmButton: "px-4 py-2 rounded text-white",
        cancelButton: "px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        if (rol === "adminsaas") {
          navigate("/auth/login");
        } else {
          navigate("/auth/login-users");
        }
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r transition-all duration-300 flex flex-col shadow-sm`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <h1 className="flex items-center space-x-2 text-gray-800 group cursor-pointer select-none">
                <span className="text-xl font-black tracking-tight leading-none transition-all duration-300 group-hover:tracking-widest">
                  <span className="bg-gradient-to-r from-green-500 via-orange-500 to-pink-500 text-transparent bg-clip-text">
                    Ener
                  </span>
                  <span className="text-slate-800">ley</span>
                </span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform duration-300"></span>
              </h1>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-indigo-600"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {
            //<SidebarItem icon={<FiHome />} label="Inicio" collapsed={collapsed} onClick={() => navigate(rol === "adminsaas" ? "/" : "/home")} />
          }
          {/* Rutas visibles solo para adminsaas */}
          {rol === "adminsaas" && (
            <SidebarItem
              icon={<FiUser />}
              label="Inquilinos"
              collapsed={collapsed}
              onClick={() => navigate("/")}
            />
          )}

          {/* Rutas visibles solo para admininquilino */}
          {rol === "admininquilino" && (
            <>
              <SidebarItem
                icon={<FiUser />}
                label="Gestores"
                collapsed={collapsed}
                onClick={() => navigate("/home")}
              />
              <SidebarItem
                icon={<FaIndustry />}
                label="Plantas"
                collapsed={collapsed}
                onClick={() => navigate("/plants")}
              />
              <SidebarItem
                icon={<FiBarChart2 />}
                label="Dashboard"
                collapsed={collapsed}
                onClick={() => navigate("/dashboard")}
              />
            </>
          )}

          <SidebarItem
            icon={<FiSettings />}
            label="Configuración"
            collapsed={collapsed}
          />
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t">
          <SidebarItem
            icon={<FiLogOut />}
            label="Cerrar sesión"
            collapsed={collapsed}
            onClick={handleLogout}
          />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-700">
            {collapsed ? "Enerley" : "Panel de Control"}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Bienvenido, {rol}
            </span>
            <button
              className="text-red-500 hover:text-red-700 transition"
              onClick={handleLogout}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-sm text-gray-500 border-t">
          Todos los derechos reservados {new Date().getFullYear()}
        </footer>

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </div>
    </div>
  );
};

export default AppLayout;

const SidebarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
}> = ({ icon, label, collapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all cursor-pointer ${
        collapsed ? "justify-center" : ""
      }`}
    >
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};
