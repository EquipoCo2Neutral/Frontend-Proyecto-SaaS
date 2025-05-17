import { useQuery } from "@tanstack/react-query";
import { AdquisicionesLista } from "../types";
import { getAcquisitionById } from "@/api/Registros/AdquisicionesAPI";

export const useAdquisicionesPorMes = (idMes: string) => {
  const { data: adquisicion } = useQuery<AdquisicionesLista, Error>({
    queryKey: ['adquisiciones', idMes],
    queryFn: () => getAcquisitionById(idMes),
  });
  
  return adquisicion;
};