import {useNavigate } from "react-router-dom";
import InviteManagerModal from "../Inquilinos/InviteManagerModal";
import { Inquilino, Persona, Suscripcion, Usuario } from "@/types/index";
import { useEffect, useState } from "react";
import { getUsuarios } from "@/api/UsuariosAPI";
import { getPersonasPorUsuarios } from "@/api/PersonasAPI";
import { getSuscripcionById } from "@/api/SuscripcionAPI";


  // Tipado de props
  interface Props {
    inquilinos: Inquilino[];
  }
  
  export default function InfoGestores({ inquilinos }: Props) {
      const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
      const [personas, setPersonas] = useState<Persona[]>([]);
      const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(null);
      const [suscripcionId, setSuscripcionId] = useState<number>(0);

    useEffect(() => {
        if (!inquilinos || inquilinos.length === 0) return;
        const id = inquilinos[0]?.suscripcion?.id ?? 0;
        setSuscripcionId(id);
        console.log("ID de la suscripción:", id);

        async function fetchUsuario() {
          try {
            const { usuarios } = await getUsuarios({
              rolId: 4,
              inquilinoId: inquilinos[0].inquilinoId,
            });
            setUsuarios(usuarios);
            console.log("Usuarios obtenidos con rol gestor:", usuarios);
            const usuarioIds = usuarios.map((u) => u.usuarioId);
            console.log("IDs de usuarios:", usuarioIds);
            if (usuarioIds.length === 0) return;
            const dataPersonas = await getPersonasPorUsuarios(usuarioIds);
            setPersonas(dataPersonas);
            console.log("Personas con rol gestor obtenidas:", dataPersonas);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        }
        
        async function fetchSuscripcion() {
          try {
            const fetchedSuscripcion = await getSuscripcionById(id);
            setSuscripcion(fetchedSuscripcion);
            console.log("Suscripción obtenida:", fetchedSuscripcion);
          } catch (error) {
            console.error("Error al obtener la suscripción:", error);
          }
        }
        fetchUsuario();
        fetchSuscripcion();
        console.log("Personas",personas)
      }, [inquilinos]);

    const navigate = useNavigate();
    return (
      <>
        <div className="p-4">
            
          <h2 className="text-xl font-semibold text-center">Administración de Gestores</h2>
          <p className="text-center text-sm text-orange-500 mt-1">Límite según plan:  {suscripcion?.plan.cantidadGestores }</p>
  
          <h3 className="mt-6 mb-2 text-md font-medium">Listado de gestores:</h3>
  
          <div className="flex gap-4 flex-wrap">
            {personas.map((persona) => (
              <div
                key={persona.rut}
                className="w-40 h-32 bg-white rounded-xl shadow border flex flex-col items-center justify-center p-2"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-500 mb-2" />
                <p className="text-sm font-medium">{persona.nombre}</p>
                <p className="text-sm font-medium">{persona.rut}</p>
                <p className="text-xs text-gray-500">+569{persona.telefono}</p>
                <p className="text-xs text-gray-500">{persona.usuario.correoUsuario}</p>
              </div>
            ))}
  
            {/* Botón para agregar nuevo gestor */}
              {personas.length < (suscripcion?.plan.cantidadGestores ?? 0) && (
                <button
                  className="w-40 h-32 rounded-xl border-2 border-dashed flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                  onClick={() => navigate(location.pathname + "?inviteManager=true")}
                >
                  <span className="text-3xl font-bold">+</span>
                </button>
              )}
            <InviteManagerModal />
          </div>
        </div>
      </>
    );
  }