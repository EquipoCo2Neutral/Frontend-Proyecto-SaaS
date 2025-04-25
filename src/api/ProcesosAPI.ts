import { ProcesosFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProcess(formData: ProcesosFormData) {
  try {
    const { data } = await api.post("/proceso", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const getProcesosByPlanta = async (plantaId: string) => {
  try {
    const { data } = await api(`/proceso/planta/${plantaId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
