import { suscripcionSchema, Suscripcion } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { z } from "zod";

const suscripcionArraySchema = z.array(suscripcionSchema);

export async function getSuscripciones(): Promise<Suscripcion[]> {
  try {
    const { data } = await api("/suscripcion");
    const response = suscripcionArraySchema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      throw new Error("Formato de datos inválido");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}


// Obtener una suscripción por ID
export async function getSuscripcionById(id: number): Promise<Suscripcion> {
    try {

      const { data } = await api.get(`/suscripcion/${id}`);
      console.log("Data recibida de la API:", data);
      const response = suscripcionSchema.safeParse(data);
  
      if (response.success) {
        return response.data;
      } else {
        throw new Error("Formato de datos inválido");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

//


type UpdateSuscripcionParams = {
    suscripcionId: number;
    planId: number;
  };
  
  export async function updateSuscripcion({ suscripcionId, planId }: UpdateSuscripcionParams) {
    try {
      const { data } = await api.patch(`/suscripcion/${suscripcionId}`, { planId });
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }