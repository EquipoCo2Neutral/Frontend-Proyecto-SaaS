import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  eliminarMesAnualDescartado,
  eliminarMesesDescartados,
  getMesesProcesoByProceso,
  updateRegistroAnual as setRegistroAnualAPI,
} from "@/api/MesProcesoAPI";

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
    registroAnual?: boolean;
  };
};

const ProcessView = () => {
  const { idProceso } = useParams<{ idProceso: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [registroAnual, setRegistroAnual] = useState(false);
  const [bloqueadoMensual, setBloqueadoMensual] = useState(false);
  const [selectedMesId, setSelectedMesId] = useState<string | null>(null);
  const [tieneMesesConfirmados, setTieneMesesConfirmados] = useState(false);

  const { data: mesesProceso, isLoading } = useQuery<MesProceso[]>({
    queryKey: ["mesesProceso", idProceso],
    queryFn: () => getMesesProcesoByProceso(idProceso!),
    enabled: !!idProceso,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await setRegistroAnualAPI(idProceso!);
      await eliminarMesesDescartados(idProceso!);
    },
    onSuccess: () => {
      setRegistroAnual(true);
      setBloqueadoMensual(true);
      if (idProceso) {
        queryClient.invalidateQueries({
          queryKey: ["mesesProceso", idProceso],
        });
      }
      Swal.fire("Activado", "El registro anual ha sido activado.", "success");
    },
    onError: () => {
      Swal.fire("Error", "No se pudo activar el registro anual.", "error");
    },
  });

  useEffect(() => {
    if (mesesProceso?.[0]?.proceso?.registroAnual) {
      setRegistroAnual(true);
      setBloqueadoMensual(true);
    }

    if (mesesProceso) {
      const algunoConfirmado = mesesProceso.some(
        (mes) => mes.mes.idMes !== 13 && mes.estado
      );
      setTieneMesesConfirmados(algunoConfirmado);

      if (algunoConfirmado && !registroAnual && idProceso) {
        // Elimina el registro anual si ya hay meses confirmados
        eliminarMesAnualDescartado(idProceso).then(() => {
          queryClient.invalidateQueries({
            queryKey: ["mesesProceso", idProceso],
          });
        });
      }
    }
  }, [mesesProceso]);

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

  const handleToggleRegistroAnual = async () => {
    if (!registroAnual) {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Si seleccionas el registro anual no podrás volver a registrar de forma mensual.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        mutation.mutate();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-800">Proceso {año}</h2>

        {!tieneMesesConfirmados && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Registro anual</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={registroAnual}
                disabled={bloqueadoMensual}
                onChange={handleToggleRegistroAnual}
              />
              <div
                className={`w-11 h-6 bg-gray-300 rounded-full transition-all 
                peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300
                peer-checked:bg-green-500
                ${bloqueadoMensual ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </label>
          </div>
        )}
      </div>

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
