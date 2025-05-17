import api from "@/lib/axios";
import { TransformacionLista, UsoFinalLista } from "@/types";
import { isAxiosError } from "axios";


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