import api from "@/lib/axios";
import { VentaElectricidadLista, VentaEnergeticosLista } from "@/types";
import { isAxiosError } from "axios";


export async function getVentaEnergeticosById(mesId: string): Promise<VentaEnergeticosLista> {
    try {
        const { data } = await api.get(`/venta-energetico/listar/${mesId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido al obtener la transformación");
    }
}