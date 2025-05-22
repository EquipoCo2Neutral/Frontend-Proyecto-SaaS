import api from "@/lib/axios";
import { ResumenTransaccionesLista } from "@/types";
import { isAxiosError } from "axios";




export async function getResumenTransaccionesById(
  mesId: string
): Promise<ResumenTransaccionesLista> {
  try {
    const { data } = await api.get(`/resumen-transacciones/${mesId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido al obtener la generación");
  }
}
