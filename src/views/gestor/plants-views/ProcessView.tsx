import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getMesesProcesoByProceso } from "@/api/MesProcesoAPI";

type MesProceso = {
  idMesProceso: string;
  estado: boolean;
  mes: {
    idMes: number;
    nombre: string;
  };
  proceso: {
    idProceso: string;
    año_proceso: number;
    estado: boolean;
  };
};

const ProcessView = () => {
  const { idProceso } = useParams<{ idProceso: string }>();
  const navigate = useNavigate();
  const [registroAnual, setRegistroAnual] = useState(false);
  const [selectedMesId, setSelectedMesId] = useState<string | null>(null);

  const { data: mesesProceso, isLoading } = useQuery<MesProceso[]>({
    queryKey: ["mesesProceso", idProceso],
    queryFn: () => getMesesProcesoByProceso(idProceso!),
    enabled: !!idProceso,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (!mesesProceso) return <p>No se encontraron datos</p>;

  const año = mesesProceso[0]?.proceso.año_proceso ?? "Año";

  const handleMesClick = (idMesProceso: string) => {
    if (selectedMesId === idMesProceso) {
      navigate(`/gestor/planta/proceso/mes-proceso/${idMesProceso}`);
    } else {
      setSelectedMesId(idMesProceso);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-800">Proceso {año}</h2>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Registro anual</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={registroAnual}
              onChange={() => setRegistroAnual(!registroAnual)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer dark:bg-gray-400 peer-checked:bg-green-500 transition-all"></div>
          </label>
        </div>
      </div>

      {/* Meses */}
      {!registroAnual ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {(() => {
            const mesesOrdenados = [...mesesProceso]
              .filter((m) => m.mes.idMes !== 13)
              .sort((a, b) => a.mes.idMes - b.mes.idMes);

            let habilitado = true;

            return mesesOrdenados.map((mes) => {
              const isSelected = selectedMesId === mes.idMesProceso;
              const puedeIngresar = habilitado;
              if (!mes.estado) habilitado = false;

              return (
                <div
                  key={mes.idMesProceso}
                  className={`relative rounded-xl p-4 text-center font-semibold border-2 shadow-md transition-all
                    ${
                      mes.estado
                        ? "bg-green-300 text-green-900 border-green-700"
                        : puedeIngresar
                        ? "bg-yellow-100 text-yellow-800 border-yellow-500"
                        : "bg-red-100 text-red-400 border-gray-300"
                    }
                    ${
                      puedeIngresar
                        ? "cursor-pointer hover:ring-4 hover:ring-yellow-300"
                        : "cursor-not-allowed opacity-60"
                    }
                    ${
                      isSelected && puedeIngresar
                        ? "ring-4 ring-yellow-500"
                        : ""
                    }
                  `}
                  onClick={() => {
                    if (puedeIngresar) handleMesClick(mes.idMesProceso);
                  }}
                >
                  {isSelected && puedeIngresar && (
                    <div className="absolute left-[-16px] top-1/2 transform -translate-y-1/2 text-2xl text-red-500">
                      ➤
                    </div>
                  )}
                  <p className="text-base capitalize">{mes.mes.nombre}</p>
                  <p className="text-sm">
                    {mes.estado
                      ? "Completado"
                      : puedeIngresar
                      ? "Habilitado"
                      : "Bloqueado"}
                  </p>
                </div>
              );
            });
          })()}
        </div>
      ) : (
        <div className="mt-6">
          {mesesProceso
            .filter((m) => m.mes.idMes === 13)
            .map((mes) => {
              const isSelected = selectedMesId === mes.idMesProceso;

              return (
                <div
                  key={mes.idMesProceso}
                  className={`relative w-full py-4 rounded-xl font-bold text-lg shadow-md border-2 text-center cursor-pointer transition-all
                    ${
                      mes.estado
                        ? "bg-green-300 text-green-900 border-green-700"
                        : "bg-red-200 text-red-700 border-red-700"
                    }
                    hover:ring-4 hover:ring-offset-1 ${
                      mes.estado ? "hover:ring-green-400" : "hover:ring-red-400"
                    }
                    ${
                      isSelected
                        ? `ring-4 ${
                            mes.estado ? "ring-green-500" : "ring-red-500"
                          }`
                        : ""
                    }
                  `}
                  onClick={() => handleMesClick(mes.idMesProceso)}
                >
                  {isSelected && (
                    <div className="absolute left-[-16px] top-1/2 transform -translate-y-1/2 text-2xl text-red-500">
                      ➤
                    </div>
                  )}
                  {mes.mes.nombre} ({mes.estado ? "Completado" : "Pendiente"})
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ProcessView;
