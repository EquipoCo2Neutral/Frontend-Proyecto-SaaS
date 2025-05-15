import { PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import AddProcessModal from "./AddProcessModal";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProcesosByPlanta } from "@/api/ProcesosAPI";
import { getMesesProcesoByProceso } from "@/api/MesProcesoAPI";
import { FaDownload } from "react-icons/fa";
import api from "@/lib/axios";

const ProcessManagerView = () => {
  const navigate = useNavigate();
  const { plantaId } = useParams();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const {
    data: procesos = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["procesos", plantaId],
    queryFn: () => getProcesosByPlanta(plantaId!),
    enabled: !!plantaId,
  });

  const { data: mesesPorProceso = {}, isLoading: loadingMeses } = useQuery({
    queryKey: ["mesesPorProceso", plantaId],
    queryFn: async () => {
      const result: Record<string, any[]> = {};
      for (const proceso of procesos) {
        const meses = await getMesesProcesoByProceso(proceso.idProceso);
        result[proceso.idProceso] = meses;
      }
      return result;
    },
    enabled: procesos.length > 0,
  });

  const isProcesoCompletado = (idProceso: string): boolean => {
    const meses = mesesPorProceso[idProceso] || [];
    if (meses.length === 0) return false;

    const mes13 = meses.find((m) => m.mes.idMes === 13);

    if (mes13) {
      return mes13.estado === true;
    }

    // Si no hay mes 13, todos los meses 1-12 deben estar completados
    return meses
      .filter((m) => m.mes.idMes >= 1 && m.mes.idMes <= 12)
      .every((m) => m.estado === true);
  };

  useEffect(() => {
    const actualizarEstadoSiCompleto = async () => {
      for (const proceso of procesos) {
        const meses = mesesPorProceso[proceso.idProceso] || [];
        if (meses.length === 0) continue;

        const mes13 = meses.find((m) => m.mes.idMes === 13);

        let completado = false;
        if (mes13) {
          completado = mes13.estado === true;
        } else {
          completado = meses
            .filter((m) => m.mes.idMes >= 1 && m.mes.idMes <= 12)
            .every((m) => m.estado === true);
        }

        if (completado !== proceso.estado) {
          try {
            await api.put(`/proceso/${proceso.idProceso}/estado`, {
              idProceso: proceso.idProceso,
              año_proceso: proceso.año_proceso,
              estado: completado,
            });
            refetch();
          } catch (error) {
            console.error("Error actualizando el estado del proceso:", error);
          }
        }
      }
    };

    if (procesos.length > 0 && Object.keys(mesesPorProceso).length > 0) {
      actualizarEstadoSiCompleto();
    }
  }, [procesos, mesesPorProceso, refetch]);

  if (isLoading || loadingMeses) return <p>Cargando procesos...</p>;
  if (error) return <p>Error al cargar procesos</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">
            Planta: {procesos[0]?.planta?.nombre ?? "Nombre no disponible"}
          </h1>
          <p className="text-2xl font-light">Listado de Procesos:</p>
        </div>
        <div>
          <div className="relative group">
            <button
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:shadow-xl text-white text-3xl font-bold focus:outline-none focus:ring-4 focus:ring-red-300"
              onClick={() => navigate(location.pathname + "?newProcess=true")}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
              Nuevo Proceso
            </span>
          </div>
        </div>
      </div>

      <div
        className={`mt-10 text-center ${
          procesos.length > 0 && procesos.length < 3
            ? "flex flex-col justify-center items-center min-h-[60vh]"
            : ""
        }`}
      >
        {procesos.length === 0 ? (
          <h3 className="text-xl text-gray-600">
            No hay procesos disponibles.
          </h3>
        ) : (
          <div className="flex flex-col items-center space-y-4 w-full">
            {procesos.map((proceso: any) => {
              const isSelected = selectedYear === proceso.año_proceso;
              const isCompleted = isProcesoCompletado(proceso.idProceso);

              return (
                <div
                  key={proceso.idProceso}
                  className={`relative p-6 rounded-xl shadow-md flex items-center justify-between cursor-pointer border-2 w-full max-w-3xl ${
                    isCompleted
                      ? "bg-green-300 border-green-700"
                      : "bg-red-200 border-red-700"
                  } ${
                    isSelected
                      ? `ring-4 ${
                          isCompleted ? "ring-green-500" : "ring-red-500"
                        }`
                      : ""
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      navigate(`/gestor/planta/proceso/${proceso.idProceso}`);
                    } else {
                      setSelectedYear(proceso.año_proceso);
                    }
                  }}
                >
                  {isSelected && (
                    <div className="absolute left-[-20px] text-red-500 text-2xl">
                      ➤
                    </div>
                  )}
                  <div>
                    <p className="text-2xl font-bold">{proceso.año_proceso}</p>
                    <p className="uppercase tracking-wide font-semibold">
                      {isCompleted ? "Completado" : "Pendiente"}
                    </p>
                  </div>
                  <button
                    className="text-black hover:text-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Descargar datos del año ${proceso.año_proceso}`);
                    }}
                    disabled={!isCompleted}
                  >
                    <FaDownload size={24} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddProcessModal />
    </>
  );
};

export default ProcessManagerView;
