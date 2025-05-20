import { useQuery } from "@tanstack/react-query";
import { AdquisicionesLista } from "../types";
import { getAcquisitionById } from "@/api/Registros/AdquisicionesAPI";
import api from "@/lib/axios";

export interface Energetico {
  id: string;
  nombre: string;
}

export const useAdquisicionesPorMes = (idMes: string) => {
  const { data: adquisicion } = useQuery<AdquisicionesLista, Error>({
    queryKey: ["adquisiciones", idMes],
    queryFn: () => getAcquisitionById(idMes),
  });

  return adquisicion;
};

export const useEnergeticosPorMesProceso = (idMesProceso: string) => {
  return useQuery<Energetico[], Error>({
    queryKey: ["energeticos-por-mes", idMesProceso],
    queryFn: async () => {
      const { data } = await api<Energetico[]>(
        `/adquisiciones/energeticos/${idMesProceso}`
      );
      return data;
    },
    enabled: !!idMesProceso,
  });
};
