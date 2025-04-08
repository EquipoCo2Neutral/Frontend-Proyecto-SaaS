import axios from 'axios';
import { z } from 'zod';
import { usuarioSchema } from '@/types/index'; // Ajusta la ruta según tu estructura real

// Validamos toda la respuesta del backend
const obtenerUsuariosResponseSchema = z.object({
  usuarios: z.array(usuarioSchema),
  total: z.number(),
});

export const getUsuarios = async () => {
  try {
    const response = await axios.get('/api/usuarios'); // Cambia la URL si es distinta
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
