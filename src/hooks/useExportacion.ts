import { useQuery } from "@tanstack/react-query";
import { ExportacionLista } from "../types";

import { getExportacionById } from "@/api/Registros/ExportacionesAPI";

export const useExportacionPorMes = (idMes: string) => {
  const { data: exportacion } = useQuery<ExportacionLista, Error>({
    queryKey: ['exportacion', idMes],
    queryFn: () => getExportacionById(idMes),
  });
  
  return exportacion;
};