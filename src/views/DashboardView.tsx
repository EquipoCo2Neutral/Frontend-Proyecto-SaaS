import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Inquilinos</h1>
      <p className="text-2xl font-light ">
        Espacio para el manejo y administracion de inquilinos
      </p>

      <nav className="my-5">
        <Link
          className="bg-green-400 hover:bg-green-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/inquilinos/create"
        >
          Nuevo Inquilino
        </Link>
      </nav>
    </>
  );
}
