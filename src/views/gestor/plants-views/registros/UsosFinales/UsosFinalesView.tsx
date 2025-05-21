import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { UsoFinalLista } from "@/types";
import { useUsoFinalPorMes } from "@/hooks/useUsoFinal";
import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import AddUFModal from "./AddUFModal";

export default function UsosFinalesView() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const mesId = pathParts[pathParts.length - 1];

  const adq: UsoFinalLista = useUsoFinalPorMes(mesId) || [];
  const usoFinalFiltradas = adq.filter((adq) => {
    const searchLower = search.toLowerCase();
    return (
      adq?.energetico.nombreEnergetico.toLowerCase().includes(searchLower) ||
      adq?.categoriaUF.nombreCategoria.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-sky-200 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-xl w-full">
        <div className="text-center mb-4 relative">
          <h2 className="text-2xl font-semibold">Usos Finales</h2>
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
              onClick={() => navigate(location.pathname + "?newUF=true")}
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
                  <th className="px-4 py-2">Categoria uso final</th>
                  <th className="px-4 py-2">Tipo uso final</th>
                  <th className="px-4 py-2">Cantidad</th>
                  <th className="px-4 py-2">Unidad</th>
                  <th className="px-4 py-2">Accion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usoFinalFiltradas.length > 0 ? (
                  usoFinalFiltradas.map((usoFinal, index) => (
                    <tr
                      key={usoFinal?.idUsoFinal}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">{index + 1}</td>

                      <td className="px-4 py-3">
                        {usoFinal?.energetico?.nombreEnergetico || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {usoFinal?.categoriaUF.nombreCategoria || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {usoFinal?.tipoUF?.nombreTipoUF.split("(")[0].trim() ||
                          "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {usoFinal?.cantidad?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {usoFinal?.unidad?.nombreUnidad?.split("(")[0].trim() ||
                          "N/A"}
                      </td>
                      <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700 hover:underline"
                          onClick={() =>
                            navigate(
                              `/adquisiciones/editar/${usoFinal?.idUsoFinal}`
                            )
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 hover:underline"
                          onClick={() =>
                            console.log("Eliminar", usoFinal?.idUsoFinal)
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
                        ? "No se encontraron adquisiciones que coincidan con la búsqueda"
                        : "No hay adquisiciones registradas para este período."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddUFModal />
    </div>
  );
}
