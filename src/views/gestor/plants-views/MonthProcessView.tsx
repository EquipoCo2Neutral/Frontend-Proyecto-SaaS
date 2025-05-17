import { useState } from "react";
import AdquisicionesView from "./registros/Adquisiciones/AdquisicionesView";
import ExportacionView from "./registros/Exportaciones/ExportacionView";
import GeneracionView from "./registros/Generacion/GeneracionView";
import ResumenTransaccionesView from "./registros/ResumenTransaccionesView";
import TransformacionEnergeticosView from "./registros/Transformaciones/TransformacionEnergeticosView";
import UsosFinalesView from "./registros/UsosFinales/UsosFinalesView";
import VentaElectricidadView from "./registros/VentaElectricidad/VentaElectricidadView";
import VentaEnergeticosView from "./registros/VentaEnergeticos/VentaEnergeticosView";

const MonthProcessView = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>("");
  const [buttonResumenView, setButtonResumenView] = useState(true);

  const registros = [
    "adquisiciones",
    "exportación",
    "generación",
    "transformación Energeticos",
    "usos Finales",
    "venta de Electricidad",
    "venta de Energeticos",
  ];
  const renderSelectedComponent = () => {
    switch (selectedProcess) {
      case "adquisiciones":
        return <AdquisicionesView />;
      case "exportación":
        return <ExportacionView />;
      case "generación":
        return <GeneracionView />;
      case "transformación Energeticos":
        return <TransformacionEnergeticosView />;
      case "usos Finales":
        return <UsosFinalesView />;
      case "venta de Electricidad":
        return <VentaElectricidadView />;
      case "venta de Energeticos":
        return <VentaEnergeticosView />;
      case "resumenTransacciones":
        return <ResumenTransaccionesView />;
      default:
        return (
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Selecciona un registro
          </h2>
        );
    }
  };

  const handleResultClick = () => {
    setSelectedProcess("resumenTransacciones");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm space-y-6 min-h-[550px] font-semibold">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <select
            className="appearance-none border-2 border-gray-200 bg-white text-gray-700 py-3 px-4 pr-10 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 hover:border-gray-300 cursor-pointer"
            value={selectedProcess}
            onChange={(e) => setSelectedProcess(e.target.value)}
          >
            <option value="" disabled hidden>
              Selecciona un registro
            </option>
            <option value="resumenTransacciones" disabled hidden>
              Resumen Transacciones
            </option>
            <option className="py-2 hover:bg-blue-100" value="adquisiciones">
              Adquisiciones
            </option>
            <option className="py-2 hover:bg-blue-100" value="usos Finales">
              Usos Finales
            </option>
            <option className="py-2 hover:bg-blue-100" value="generación">
              Generación Eléctrica
            </option>
            <option
              className="py-2 hover:bg-blue-100"
              value="venta de Electricidad"
            >
              Venta de Electricidad
            </option>
            <option
              className="py-2 hover:bg-blue-100"
              value="venta de Energeticos"
            >
              Venta de Energéticos
            </option>
            <option
              className="py-2 hover:bg-blue-100"
              value="transformación Energeticos"
            >
              Transformación de Energéticos
            </option>
            <option className="py-2 hover:bg-blue-100" value="exportación">
              Exportación
            </option>
          </select>

          {/* icono de flecha mejorado */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg
              className="h-5 w-5 transition-transform duration-200 transform group-hover:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {buttonResumenView && (
          <button
            onClick={handleResultClick}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 shadow-md hover:shadow-xl w-full sm:w-auto"
          >
            Resumen Transacciones
          </button>
        )}
      </div>

      <div className="w-full pt-4 flex justify-center">
        <div className="w-full max-w-5xl px-4">{renderSelectedComponent()}</div>
      </div>

      {/* Vista cuadrados de selección de procesos */}
      {selectedProcess === "" && (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Primera fila con 4 cajas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {registros.slice(0, 4).map((registro) => (
              <div
                key={registro}
                onClick={() => setSelectedProcess(registro)}
                className="
              cursor-pointer rounded-2xl p-8 shadow-lg transition duration-300 ease-in-out transform hover:scale-105
              flex items-center justify-center text-center
              bg-teal-700 hover:bg-teal-900 p-4 hover:border-2 hover:border-orange-500
            "
              >
                <span className="text-sm md:text-base font-semibold text-white break-words text-center block max-w-[180px]">
                  {registro.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          {/* Segunda fila centrada con 3 cajas */}
          <div className="mt-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {registros.slice(4).map((registro) => (
                <div
                  key={registro}
                  onClick={() => setSelectedProcess(registro)}
                  className="
                cursor-pointer rounded-2xl p-8 shadow-lg transition duration-300 ease-in-out transform hover:scale-105
                flex items-center justify-center text-center
              bg-teal-700 hover:bg-teal-900 p-4 hover:border-2 hover:border-orange-500
              "
                >
                  <span className="text-sm md:text-base font-semibold text-white break-words text-center block max-w-[180px]">
                    {registro.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthProcessView;
