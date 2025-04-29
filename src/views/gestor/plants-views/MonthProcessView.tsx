import { useState } from "react";
import AdquisicionesView from "./registros/AdquisicionesView";
import ExportacionView from "./registros/ExportacionView";
import GeneracionView from "./registros/GeneracionView";
import ResultadoTransaccionesView from "./registros/ResultadoTransaccionesView";
import TransformacionEnergeticosView from "./registros/TransformacionEnergeticosView";
import UsosFinalesView from "./registros/UsosFinalesView";
import VentaElectricidadView from "./registros/VentaElectricidadView";
import VentaEnergeticosView from "./registros/VentaEnergeticosView";



const MonthProcessView = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>("");

  const procesos = [
    "adquisiciones",
    "exportación",
    "generación",
    "transformación Energeticos",
    "usos Finales",
    "venta de Electricidad",
    "venta de Energeticos"
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
      default:
        return <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Selecciona un proceso</h2>;
    }
  };
  const handleResultClick = () => {
    alert("Resultado de transacciones mostrado aquí.");
    
  };


return (
  <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6">
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      
      
      <div className="relative w-full sm:w-auto">
        <select
          className="appearance-none border border-gray-300 bg-white text-gray-700 p-3 pr-10 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none w-full sm:w-64 transition"
          value={selectedProcess}
          onChange={(e) => setSelectedProcess(e.target.value)}
        >
          <option value="">-- Proceso --</option>
          <option value="adquisiciones">Adquisiciones</option>
          <option value="usos Finales">Usos Finales</option>
          <option value="generación">Generación Eléctrica</option>
          <option value="venta de Electricidad">Venta de Electricidad</option>
          <option value="venta de Energeticos">Venta de Energéticos</option>
          <option value="transformación Energeticos">Transformación de Energéticos</option>
          <option value="exportación">Exportación</option>
        </select>

        {/* Ícono de flecha */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      
      <button
        onClick={handleResultClick}
        className="bg-gray-700 text-white px-5 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 shadow-md hover:shadow-xl w-full sm:w-auto"
      >
        Resultado Transacciones
      </button>
    </div>

    
    <div className="border-t border-gray-200 pt-4 flex justify-center items-center">
      {renderSelectedComponent()}
    </div>

    {/* Vista cuadrados de selección de procesos */}
    {selectedProcess === "" && (
      <div className="p-6 max-w-7xl mx-auto">

        {/* Primera fila con 4 cajas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {procesos.slice(0, 4).map((process) => (
            <div
              key={process}
              onClick={() => setSelectedProcess(process)}
              className={`cursor-pointer border rounded-2xl p-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-center ${
                selectedProcess === process
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              <span className="text-sm md:text-base font-medium break-words text-center block max-w-[180px]">
                {process.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Segunda fila centrada con 3 cajas */}
        <div className="mt-6 flex justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {procesos.slice(4).map((process) => (
              <div
                key={process}
                onClick={() => setSelectedProcess(process)}
                className={`cursor-pointer border rounded-2xl p-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-center ${
                  selectedProcess === process
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                <span className="text-sm md:text-base font-medium break-words text-center block max-w-[180px]">
                  {process.toUpperCase()}
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
