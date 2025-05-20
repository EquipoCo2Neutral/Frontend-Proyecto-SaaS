import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { GeneracionLista } from "@/types";
import { useGeneracionPorMes } from "@/hooks/useGeneraciones";
import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import AddGenerationModal from "./AddGenerationModal";

export default function GeneracionView() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const mesId = pathParts[pathParts.length - 1];

  const adq: GeneracionLista = useGeneracionPorMes(mesId) || [];
  console.log(adq);
  const generacionFiltradas = adq.filter((adq) => {
    const searchLower = search.toLowerCase();
    return adq?.unidadCI.nombreUnidad.toLowerCase().includes(searchLower);
  });

  return (
    <div className="min-h-screen bg-sky-200 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-xl w-full">
        <div className="text-center mb-4 relative">
          <h2 className="text-2xl font-semibold">Generacion</h2>
          <QuestionMarkCircleIcon className="absolute right-4 top-1 h-5 w-5 text-yellow-500 cursor-pointer" />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-inner relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              onClick={() =>
                navigate(location.pathname + "?newGeneration=true")
              }
            >
              <PlusIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          <div className="overflow-auto rounded-md border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2">N°</th>
                  <th className="px-4 py-2">Energético</th>
                  <th className="px-4 py-2">Categoria</th>
                  <th className="px-4 py-2">Cantidad</th>
                  <th className="px-4 py-2">Unidad</th>
                  <th className="px-4 py-2">Accion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {generacionFiltradas.length > 0 ? (
                  generacionFiltradas.map((generacion, index) => (
                    <tr
                      key={generacion?.idGeneracion}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">{index + 1}</td>

                      <td className="px-4 py-3">
                        {generacion?.idTecnologia === 0
                          ? "Solar"
                          : generacion?.idTecnologia === 1
                          ? "Eólica"
                          : generacion?.idTecnologia === 2
                          ? "Hidrica"
                          : generacion?.idTecnologia === 3
                          ? "Geotermica"
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {"Generacion Energia Renovable"}
                      </td>
                      <td className="px-4 py-3">
                        {generacion?.capacidadInstalada?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {generacion?.unidadCI?.nombreUnidad
                          ?.split("(")[0]
                          .trim() || "N/A"}
                      </td>
                      <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700 hover:underline"
                          onClick={() =>
                            navigate(
                              `/adquisiciones/editar/${generacion?.idGeneracion}`
                            )
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 hover:underline"
                          onClick={() =>
                            console.log("Eliminar", generacion?.idGeneracion)
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-gray-400"
                      colSpan={7}
                    >
                      {search
                        ? "No se encontraron Generaciones que coincidan con la búsqueda"
                        : "No hay Generaciones  registradas para este período."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddGenerationModal />
    </div>
  );
}
