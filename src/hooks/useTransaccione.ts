// hooks/useTransacciones.ts
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Transaccion {
  idTransaccion: number;
  nombreTransaccion: string;
}

export const useTransacciones = () => {
  return useQuery<Transaccion[]>({
    queryKey: ["transacciones"],
    queryFn: async () => {
      const { data } = await api("/transacciones");
      return data;
    },
  });
};
