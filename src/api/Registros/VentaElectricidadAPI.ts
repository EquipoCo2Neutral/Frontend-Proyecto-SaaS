import api from "@/lib/axios";
import { VentaElectricidadFormData, VentaElectricidadLista } from "@/types";
import { isAxiosError } from "axios";

export async function createVentaElectricidad(
  formData: VentaElectricidadFormData
) {
  try {
    const { data } = await api.post("/venta-electricidad", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getVentaElectricidadById(
  mesId: string
): Promise<VentaElectricidadLista> {
  try {
    const { data } = await api.get(`/venta-electricidad/listar/${mesId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido al obtener la transformación");
  }
}
