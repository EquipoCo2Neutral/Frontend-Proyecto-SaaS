import { useNavigate } from "react-router-dom";
import InviteManagerModal from "@/views/Inquilinos/InviteManagerModal";

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mb-4">Administración de Gestores</h1>
        <p className="text-lg">
          Esta es la vista para administradores de gestores.
        </p>
      </div>
      <div className=" my-4 mx-4 px-4 py-4 bg-green-50 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mt-4 mb-10">
          <p className="font-bold text-xl">Listado de gestores:</p>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:shadow-xl text-white text-3xl font-bold focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => navigate(location.pathname + "?inviteManager=true")}
          >
            +
          </button>
        </div>
        <div>
          <p className="bg-white">gestor 1</p>
          <p className="bg-white">gestor 1</p>
          <p className="bg-white">gestor 1</p>
        </div>
      </div>

      <InviteManagerModal />
    </>
  );
};

export default HomeView;
