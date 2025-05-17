import api from "@/lib/axios";
import { VentaElectricidadLista } from "@/types";
import { isAxiosError } from "axios";


export async function getVentaElectricidadById(mesId: string): Promise<VentaElectricidadLista> {
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