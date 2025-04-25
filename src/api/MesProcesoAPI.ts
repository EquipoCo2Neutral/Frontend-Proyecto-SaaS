import api from "@/lib/axios";
import { isAxiosError } from "axios";

export const getMesesProcesoByProceso = async (idProceso: string) => {
  try {
    const { data } = await api(`/mes-proceso/proceso/${idProceso}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
