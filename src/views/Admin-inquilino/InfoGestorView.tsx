import {useNavigate } from "react-router-dom";
import InviteManagerModal from "../Inquilinos/InviteManagerModal";
import { Inquilino, Persona, Suscripcion, Usuario } from "@/types/index";
import { useEffect, useState } from "react";
import { getUsuarios } from "@/api/UsuariosAPI";
import { getPersonasPorUsuarios } from "@/api/PersonasAPI";
import { getSuscripcionById } from "@/api/SuscripcionAPI";
import { PlusIcon } from "@heroicons/react/20/solid";


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

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-gray-800">Listado Gestores</h1>
            <p className="text-orange-500 font-medium text-sm mt-1">
              Límite según plan: {suscripcion?.plan.cantidadGestores }
            </p>
          </div>
            {/* Botón para agregar nuevo gestor */}
            {personas.length < (suscripcion?.plan.cantidadGestores ?? 0) && (
              <div className="relative group" >
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg text-white text-3xl font-bold"
                  onClick={() => navigate(location.pathname + "?inviteManager=true")}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        Invitar gestor
                </span>
              </div>

              )}
        </div>


        <div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {personas.map((persona) => (
              <div
                key={persona.rut}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col items-start space-y-4 border hover:shadow-lg transition"
              >
                <div className="w-6 h-6 rounded-full bg-green-300" />
                <p className="text-xl font-bold text-gray-700">{persona.nombre}</p>
                <p className="text-sm font-medium">{persona.rut}</p>
                <p className="text-sm text-gray-400">+569{persona.telefono}</p>
                <p className="text-sm text-gray-400">{persona.usuario.correoUsuario}</p>
              </div>
            ))}
            <InviteManagerModal />
          </div>
        </div>
        
      </>
    );
  }