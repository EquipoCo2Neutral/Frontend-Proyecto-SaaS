import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface SectorEconomico {
  idSector: number;
  nombreSector: string;
}

interface SubSectorEconomico {
  idSubSector: number;
  nombreSubSector: string;
  sectorEconomico: {
    idSector: number;
    nombreSector: string;
  };
}

export const useSectores = () => {
  return useQuery<SectorEconomico[]>({
    queryKey: ["sectores"],
    queryFn: async () => {
      const { data } = await api("/sector-economico");
      return data;
    },
  });
};

export const useSubSectores = (idSector: string) => {
  return useQuery<SubSectorEconomico[]>({
    queryKey: ["subSectores", idSector],
    queryFn: async () => {
      const { data } = await api(`/sub-sector-economico/sector/${idSector}`);
      return data;
    },
  });
};
