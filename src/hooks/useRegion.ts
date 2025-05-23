import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Regiones {
  idRegion: number;
  nombre: string;
  pais: {
    idPais: number;
    nombre: string;
  };
}

export const useRegiones = (idPais: number) => {
  return useQuery<Regiones[]>({
    queryKey: ["regionesPorPais", idPais],
    queryFn: async () => {
      const { data } = await api(`/regiones?pais_id=${idPais}`);
      return data;
    },
    enabled: !!idPais,
  });
};
