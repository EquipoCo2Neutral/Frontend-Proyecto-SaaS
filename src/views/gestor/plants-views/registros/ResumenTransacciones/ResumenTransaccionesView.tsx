import { useResumenTransaccionPorMes } from "@/hooks/useResumenTransacciones";
import { ResumenTransaccionesLista } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { LoadingSpinner } from "@/components/tablaRegistros/LoadingSpinner";
import { ErrorAlert } from "@/components/tablaRegistros/ErrorAlert";
import { EmptyState } from "@/components/tablaRegistros/EmptyState";

interface EnergiaTableProps {
  data: ResumenTransaccionesLista;
}

const EnergiaTable: React.FC<EnergiaTableProps> = ({ data }) => {
  // Agrupar datos por energético
  const groupedData = data.reduce((acc: Record<string, ResumenTransaccionesLista>, item) => {
    if (!acc[item.Energetico]) {
      acc[item.Energetico] = [];
    }
    acc[item.Energetico].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(groupedData).map(([energetico, items]) => (
        <div key={energetico} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-blue-50 px-4 py-2 rounded-lg">
            {energetico.toUpperCase()}
          </h2>
          
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entrada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salida
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr 
                    key={`${energetico}-${index}`} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.Categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.Unidad}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.cantidadEntrada > 0 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                      {item.cantidadEntrada > 0 ? item.cantidadEntrada.toLocaleString() : '-'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.cantidadSalida > 0 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {item.cantidadSalida > 0 ? item.cantidadSalida.toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ResumenTransaccionesView() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const mesId = pathParts[pathParts.length - 1];

  const { data, isLoading, error } = useResumenTransaccionPorMes(mesId);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return <ErrorAlert></ErrorAlert>;
  }

  if (!data || data.length === 0) {
    return <EmptyState></EmptyState>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Resumen de Transacciones
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <EnergiaTable data={data} />
        </div>
      </main>
    </div>
  );
}