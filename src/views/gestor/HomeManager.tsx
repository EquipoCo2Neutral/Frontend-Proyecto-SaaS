import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPlantsByEmail} from "@/api/PlantasAPI";
import AddPlantModal from "../Admin-inquilino/AddPlantModal";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function HomeManager() {
  const [inquilinoIdToken, setInquilinoIdToken] = useState<string>("");


  const { data, isLoading } = useQuery({
    queryKey: ["plantas"],
    queryFn: getPlantsByEmail,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }
    const decodedToken: any = jwtDecode(token);
    setInquilinoIdToken(decodedToken.inquilinoId);
  
  }, [inquilinoIdToken]);

  if (isLoading) {
    return <p className="text-center py-10">Cargando plantas...</p>;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-800">
            Plantas Asignadas
          </h1>
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
                Ver Procesos
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
