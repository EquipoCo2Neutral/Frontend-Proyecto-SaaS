import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { getPlantsByTenant } from "@/api/PlantasAPI";

import AddPlantModal from "./AddPlantModal";
export default function PlantasView() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["plantas"],
    queryFn: getPlantsByTenant,
  });

  if (isLoading) {
    return <p className="text-center py-10">Cargando plantas...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-800">Listado Plantas</h1>
          <p className="text-orange-500 font-medium text-sm mt-1">
            Límite según plan
          </p>
        </div>
        <div className="relative group">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg text-white text-3xl font-bold"
            onClick={() => navigate(location.pathname + "?newPlant=true")}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            Agregar planta
          </span>
        </div>
      </div>

      {data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {data.map((planta: any) => (
            <div
              key={planta.idPlanta}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-start space-y-4 border hover:shadow-lg transition"
            >
              <div className="w-6 h-6 rounded-full bg-green-300" />
              <div>
                <h2 className="text-xl font-bold text-gray-700">
                  {planta.nombre}
                </h2>
                <p className="text-sm text-gray-400">
                  Dirección: {planta.direccion}
                </p>
              </div>
              <Link
                to={`/plantas/${planta.idPlanta}`}
                className="text-blue-500 hover:underline text-sm mt-2"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-20 text-gray-500">
          No hay plantas registradas.
        </p>
      )}
      <AddPlantModal />
    </>
  );
}
