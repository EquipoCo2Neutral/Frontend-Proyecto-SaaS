import { useState } from "react";
import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import AddAcquisitionModal from "./AddAcquisitionModal";
import { useNavigate } from "react-router-dom";

export default function AdquisicionesView() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky-200 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-xl w-full">
        <div className="text-center mb-4 relative">
          <h2 className="text-2xl font-semibold">Adquisiciones</h2>
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
                navigate(location.pathname + "?newAcquisition=true")
              }
            >
              <PlusIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          <div className="overflow-auto rounded-md border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Energético</th>
                  <th className="px-4 py-2">Cantidad</th>
                  <th className="px-4 py-2">Unidad</th>
                  <th className="px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="px-4 py-3 text-center text-gray-400"
                    colSpan={5}
                  >
                    No hay adquisiciones registradas.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddAcquisitionModal />
    </div>
  );
}
