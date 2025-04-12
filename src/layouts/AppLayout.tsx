import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed((prev) => !prev);
  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: { rol: string } = jwtDecode(token);

        // Redirigir según el rol
        if (decoded.rol === "adminsaas") {
          localStorage.removeItem("token");
          navigate("/auth/login");
        } else {
          localStorage.removeItem("token");
          navigate("/auth/login-users");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token");
        navigate("/auth/login-users"); // En caso de error, redirigir a login general
      }
    } else {
      navigate("/auth/login-users"); // Si no hay token, redirigir a login
    }
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
          <SidebarItem icon={<FiHome />} label="Inicio" collapsed={collapsed} />
          <SidebarItem
            icon={<FiUser />}
            label="Usuarios"
            collapsed={collapsed}
          />
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
              Bienvenido, Usuario
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
