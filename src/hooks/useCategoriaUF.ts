import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface CategoriaUF {
  idCategoriaUF: number;
  nombreCategoria: string;
}

interface TipoUF {
  idTipoUF: number;
  nombreTipoUF: string;
  categoriaUF: {
    idCategoriaUF: number;
    nombreCategoria: string;
  };
}

export const useCategoriasUF = () => {
  return useQuery<CategoriaUF[]>({
    queryKey: ["categoriasUF"],
    queryFn: async () => {
      const { data } = await api("/categoria-uf");
      return data;
    },
  });
};

export const useTipoUFPorCategoria = (idCategoriaUF: number) => {
  return useQuery<TipoUF[]>({
    queryKey: ["tipoUFPorCategoria", idCategoriaUF],
    queryFn: async () => {
      const { data } = await api(`/tipo-uf/categoria/${idCategoriaUF}`);
      return data;
    },
    enabled: !!idCategoriaUF,
  });
};
