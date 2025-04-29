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

  const renderSelectedComponent = () => {
    switch (selectedProcess) {
      case "adquisiciones":
        return <AdquisicionesView />;
      case "exportacion":
        return <ExportacionView />;
      case "generacion":
        return <GeneracionView />;
      case "transformacionEnergeticos":
        return <TransformacionEnergeticosView />;
      case "usosFinales":
        return <UsosFinalesView />;
      case "ventaElectricidad":
        return <VentaElectricidadView />;
      case "ventaEnergeticos":
        return <VentaEnergeticosView />;
      default:
        return <div>Selecciona un proceso</div>;
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
          <option value="">-- Selecciona un proceso --</option>
          <option value="adquisiciones">Adquisiciones</option>
          <option value="usosFinales">Usos Finales</option>
          <option value="generacion">Generación Eléctrica</option>
          <option value="ventaElectricidad">Venta de Electricidad</option>
          <option value="ventaEnergeticos">Venta de Energéticos</option>
          <option value="transformacionEnergeticos">Transformación de Energéticos</option>
          <option value="exportacion">Exportación</option>
          <option value="resultadoTransacciones">Resultado de Transacciones</option>
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
  </div>
);
};

export default MonthProcessView;
