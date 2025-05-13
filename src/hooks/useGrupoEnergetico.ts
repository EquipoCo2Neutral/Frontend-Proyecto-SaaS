import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GrupoEnergetico {
  idGrupoEnergetico: number;
  nombreGrupoEnergetico: string;
}

export const useGrupoE = () => {
  return useQuery<GrupoEnergetico[]>({
    queryKey: ["GruposEnergeticos"],
    queryFn: async () => {
      const { data } = await api("/grupo-energetico");
      return data;
    },
  });
};
