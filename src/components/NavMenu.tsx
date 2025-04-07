import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";

import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function NavMenu() {
  const navigate = useNavigate();

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
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-orange-400">
        <Bars3Icon className="w-6 h-6 text-white " />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className="text-center">Hola: Usuario</p>
            <Link to="/profile" className="block p-2 hover:text-purple-950">
              Mi Perfil
            </Link>
            <Link to="/" className="block p-2 hover:text-purple-950">
              Mis Proyectos
            </Link>
            <button
              className="block p-2 hover:text-purple-950"
              type="button"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
