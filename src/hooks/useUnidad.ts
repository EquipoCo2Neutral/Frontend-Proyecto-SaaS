import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Unidad {
  idUnidad: number;
  nombreUnidad: string;
  energetico: {
    idEnergetico: number;
    nombreEnergetico: string;
  };
}

export const useUnidadesByEnergetico = (idEnergetico: number) => {
  return useQuery<Unidad[]>({
    queryKey: ["unidadesByEnergetico", idEnergetico],
    queryFn: async () => {
      const { data } = await api(`/unidades/energetico/${idEnergetico}`);
      return data;
    },
    enabled: !!idEnergetico, // solo corre si hay ID
  });
};

export const useUnidadesByIds = (ids: number[]) => {
  return useQuery<Unidad[]>({
    queryKey: ["unidadesByIds", ids],
    queryFn: async () => {
      const queryString = ids.join(",");
      const { data } = await api.get(`/unidades/by-ids?ids=${queryString}`);
      return data;
    },
    enabled: ids.length > 0,
  });
};
