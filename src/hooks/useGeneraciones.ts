import { useQuery } from "@tanstack/react-query";
import { GeneracionLista } from "../types";
import { getGeneracionById } from "@/api/Registros/GeneracionAPI";


export const useGeneracionPorMes = (idMes: string) => {
  const { data: generacion } = useQuery<GeneracionLista, Error>({
    queryKey: ['generacion', idMes],
    queryFn: () => getGeneracionById(idMes),
  });
  return generacion;
};