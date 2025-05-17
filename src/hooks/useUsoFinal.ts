import { useQuery } from "@tanstack/react-query";
import { UsoFinalLista } from "../types";

import { getUsoFinaleById } from "@/api/Registros/UsosFinalesAPI";


export const useUsoFinalPorMes = (idMes: string) => {
  const { data: usoFinal } = useQuery<UsoFinalLista, Error>({
    queryKey: ['usoFinal', idMes],
    queryFn: () => getUsoFinaleById(idMes),
  });
  return usoFinal;
};