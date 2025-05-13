import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Energetico {
  idEnergetico: number;
  nombreEnergetico: string;
  grupoEnergetico: {
    idGrupoEnergetico: number;
    nombreGrupoEnergetico: string;
  };
}

export const useEnergeticosPorGrupo = (idGrupoEnergetico: number) => {
  return useQuery<Energetico[]>({
    queryKey: ["energeticosPorGrupo", idGrupoEnergetico],
    queryFn: async () => {
      const { data } = await api(`/energeticos/grupo/${idGrupoEnergetico}`);
      return data;
    },
    enabled: !!idGrupoEnergetico,
  });
};
