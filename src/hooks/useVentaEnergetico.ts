import { useQuery } from "@tanstack/react-query";
import { VentaEnergeticosLista } from "../types";



import { getVentaEnergeticosById } from "@/api/Registros/VentaEnergeticosAPI";


export const useVentasEnergeticoPorMes = (idMes: string) => {
  const { data: ventaEnergetico } = useQuery<VentaEnergeticosLista, Error>({
    queryKey: ['ventaEnergetico', idMes],
    queryFn: () => getVentaEnergeticosById(idMes),
  });
  return ventaEnergetico;
};