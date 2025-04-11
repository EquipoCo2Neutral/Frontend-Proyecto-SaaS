import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardPlantasSchema, PlantaRegisterForm } from "../types";

import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  inquilinoId: string;
}

export async function getPlantsByTenant() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");

    const decoded: TokenPayload = jwtDecode(token);
    const inquilinoId = decoded.inquilinoId;

    if (!inquilinoId) throw new Error("inquilinoId no disponible en token");

    const { data } = await api(`/planta/inquilino/${inquilinoId}`);
    const response = dashboardPlantasSchema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      throw new Error("Error al validar la respuesta");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function createPlantsByTenant(formData: PlantaRegisterForm) {
  try {
    const { data } = await api.post(`/planta`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
