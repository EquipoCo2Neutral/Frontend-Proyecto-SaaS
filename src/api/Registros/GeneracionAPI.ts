import api from "@/lib/axios";
import { GeneracionLista } from "@/types";
import { isAxiosError } from "axios";


export async function getGeneracionById(mesId: string): Promise<GeneracionLista> {
    try {
        const { data } = await api.get(`/generacion/listar/${mesId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido al obtener la generación");
    }
    }
    