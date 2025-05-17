import { useQuery } from "@tanstack/react-query";
import { VentaElectricidadLista } from "../types";


import { getVentaElectricidadById } from "@/api/Registros/VentaElectricidadAPI";


export const useVentaElectricidadPorMes = (idMes: string) => {
  const { data: ventaElectricidad } = useQuery<VentaElectricidadLista, Error>({
    queryKey: ['ventaElectricidad', idMes],
    queryFn: () => getVentaElectricidadById(idMes),
  });
  return ventaElectricidad;
};