import { getResumenTransaccionesById } from "@/api/Registros/ResumenTransaccionesAPI";
import { useQuery } from "@tanstack/react-query";
import { ResumenTransaccionesLista } from "@/types";

export const useResumenTransaccionPorMes = (idMes: string) => {
  const {
    data: resumenTransacciones,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<ResumenTransaccionesLista, Error>({
    queryKey: ['resumenTransacciones', idMes],
    queryFn: () => getResumenTransaccionesById(idMes),
    enabled: !!idMes, // Solo ejecutar si idMes tiene valor
    refetchOnWindowFocus: true,
  });

  // Calcular totales
  const totalEntrada = resumenTransacciones?.reduce(
    (sum, item) => sum + item.cantidadEntrada, 0
  ) || 0;

  const totalSalida = resumenTransacciones?.reduce(
    (sum, item) => sum + item.cantidadSalida, 0
  ) || 0;

  return {
    data: resumenTransacciones,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    totalEntrada,
    totalSalida,
    isEmpty: !resumenTransacciones || resumenTransacciones.length === 0,
  }
};