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

export const updateRegistroAnual = async (idProceso: string) => {
  try {
    const { data } = await api.patch(
      `/proceso/${idProceso}/habilitar-registro-anual`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const eliminarMesesDescartados = async (idProceso: string) => {
  try {
    const { data } = await api.delete(
      `/mes-proceso/meses-descartados/${idProceso}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const eliminarMesAnualDescartado = async (idProceso: string) => {
  try {
    const { data } = await api.delete(
      `/mes-proceso/mes-anual-descartado/${idProceso}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
