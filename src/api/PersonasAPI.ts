
import { personaSchema, Persona, PersonaRegistro } from "@/types/index";
import api from "@/lib/axios";

import { z } from "zod";


const personaArraySchema = z.array(personaSchema);

export const getPersonasPorUsuarios = async (usuarioIds: string[]) => {
    try {
      const params = new URLSearchParams();
      usuarioIds.forEach((id) => params.append('usuarioId', id));
  
      const response = await api.get(`/persona?${params.toString()}`);
  
      const parsed = personaArraySchema.safeParse(response.data);
  
      if (!parsed.success) {
        console.error('Error validando la respuesta de personas', parsed.error);
        throw new Error('Respuesta inválida del servidor');
      }
  
      return parsed.data;
    } catch (error) {
      console.error('Error al obtener personas', error);
      throw error;
    }
  };

export const createPersona = async (nuevaPersona: PersonaRegistro) => {
    try {
      const response = await api.post("/Persona", nuevaPersona);
      return response.data;
    } catch (error) {
      console.error("Error al crear persona:", error);
      throw error;
    }
  };
  
