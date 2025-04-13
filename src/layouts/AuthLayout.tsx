import Logo from "@/components/Logo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e1f5fe]">
        <div className="w-full max-w-md sm:max-w-lg   p-6 sm:p-10 ">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-36">
              <Logo />
            </div>
          </div>

          {/* Form */}
          <div>
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default AuthLayout;
