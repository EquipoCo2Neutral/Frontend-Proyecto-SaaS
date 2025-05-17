import api from "@/lib/axios";
import { ExportacionGet, ExportacionLista, ExportacionPost } from "@/types";
import { isAxiosError } from "axios";


export async function createExportacion(formData: ExportacionPost) {
    try {
        const { data } = await api.post("/exportaciones", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
    }
}

export async function getExportacionById(id: string): Promise<ExportacionLista> {
    try {
        const { data } = await api.get(`/exportaciones/listar/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
        throw new Error('Error desconocido al obtener la exportación');
    }
}