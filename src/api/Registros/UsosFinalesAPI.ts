import api from "@/lib/axios";
import { UFFormData, UsoFinalLista } from "@/types";
import { isAxiosError } from "axios";

export async function createUF(formData: UFFormData) {
  try {
    const { data } = await api.post("/usos-finales", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getUsoFinaleById(mesId: string): Promise<UsoFinalLista> {
  try {
    const { data } = await api.get(`/usos-finales/listar/${mesId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido al obtener la transformación");
  }
}
