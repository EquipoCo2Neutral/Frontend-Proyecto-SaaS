import { useQuery } from "@tanstack/react-query";
import { TransformacionLista } from "../types";

import { getTransformacionById } from "@/api/Registros/TransformacionesAPI";


export const useTransformacionPorMes = (idMes: string) => {
  const { data: transformacion } = useQuery<TransformacionLista, Error>({
    queryKey: ['transformacion', idMes],
    queryFn: () => getTransformacionById(idMes),
  });
  return transformacion;
};