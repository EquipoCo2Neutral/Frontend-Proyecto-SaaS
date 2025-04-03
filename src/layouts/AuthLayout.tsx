import Logo from "@/components/Logo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px]  ">
          <div className="flex justify-center ">
            <div className="w-[300px]">
              <Logo />
            </div>
          </div>

          <div className="mt-10">
            <Outlet />
          </div>
        </div>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </div>
    </>
  );
};

export default AuthLayout;
