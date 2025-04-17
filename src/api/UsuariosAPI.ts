
import { z } from 'zod';
import { usuarioSchema } from '@/types/index'; 
import api from '@/lib/axios';

// Validamos toda la respuesta del backend
const obtenerUsuariosResponseSchema = z.object({
  usuarios: z.array(usuarioSchema),
  total: z.number(),
});


// Tipado de los filtros opcionales
interface GetUsuariosParams {
  rolId?: number;
  inquilinoId?: string;
}

export const getUsuarios = async (params?: GetUsuariosParams) => {
  try {
    const response = await api.get('/usuario', {
      params, // Esto genera ?rolId=...&inquilinoId=... automáticamente
    });

    const parsed = obtenerUsuariosResponseSchema.safeParse(response.data);

    if (!parsed.success) {
      console.error('Error validando la respuesta de usuarios', parsed.error);
      throw new Error('Respuesta inválida del servidor');
    }

    return parsed.data;
  } catch (error) {
    console.error('Error al obtener usuarios', error);
    throw error;
  }
};

export const getUsuarioPorCorreo = async (correo: string) => {
  try {
    const response = await api.get(`/usuario/correo/${correo}`);

    const parsed = usuarioSchema.safeParse(response.data);

    if (!parsed.success) {
      console.error("Error validando la respuesta de usuario:", parsed.error);
      throw new Error("Respuesta inválida del servidor");
    }

    return parsed.data;
  } catch (error) {
    console.error("Error al obtener usuario por correo:", error);
    throw error;
  }
};