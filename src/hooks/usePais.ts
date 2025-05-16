import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Paises {
  idPais: number;
  nombre: string;
}

export const usePaises = () => {
  return useQuery<Paises[]>({
    queryKey: ["paises"],
    queryFn: async () => {
      const { data } = await api("/paises");
      return data;
    },
  });
};
