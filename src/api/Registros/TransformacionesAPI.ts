import api from "@/lib/axios";
import { TransformacionLista } from "@/types";
import { isAxiosError } from "axios";


export async function getTransformacionById(mesId: string): Promise<TransformacionLista> {
    try {
        const { data } = await api.get(`/transformacion/listar/${mesId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido al obtener la transformación");
    }
}