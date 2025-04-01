import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

const AppLayout = () => {
  return (
    <>
      <header className="bg-white">
        <div className="max-w-screen-3xl mx-auto px-4 flex flex-row justify-between items-center">
          <div className="w-20">
            <Logo />
          </div>
          <NavMenu />
        </div>
      </header>

      <section className="max-w-screen-3xl mx-auto  p-5 bg-gray-100">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default AppLayout;
