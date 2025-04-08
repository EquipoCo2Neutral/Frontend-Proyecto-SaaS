
import { useEffect, useState } from "react";


import { Inquilino, Persona, Plan, Suscripcion, Usuario } from "@/types/index";


import { getPlans } from "@/api/PlanAPI";
import { createSuscripcion, getSuscripcionById} from "@/api/SuscripcionAPI";
import { updateTenant } from "@/api/TenantAPI";


import CrearSuscripcionModal from "./crearSuscripcion";
import { useQueryClient } from "@tanstack/react-query";
import { getUsuarios } from "@/api/UsuariosAPI";

import { getPersonasPorUsuarios } from "@/api/PersonasAPI";

// Tipado de props
interface Props {
  inquilinos: Inquilino[];
}


export default function TenantInfo({ inquilinos }: Props) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(null);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const [personas, setPersonas] = useState<Persona[]>([]);

  const [suscripcionId, setSuscripcionId] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const queryClient = useQueryClient(); // Inicializamos queryClient
  
  //useEffect para obtener planes y suscripción
  useEffect(() => {
    if (!inquilinos || inquilinos.length === 0) return;
    const id = inquilinos[0]?.suscripcion?.id ?? 0;
    setSuscripcionId(id);
    console.log("ID de suscripción al renderizar:", id);

    async function fetchPlans() {
      try {
        const fetchedPlans = await getPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error al obtener los planes:", error);
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

    async function fetchUsuario() {
      try {
        const { usuarios } = await getUsuarios({
          rolId: 2,
          inquilinoId: inquilinos[0].inquilinoId,
        });
        setUsuarios(usuarios);
        console.log("Usuarios obtenidos:", usuarios);
        const usuarioIds = usuarios.map((u) => u.usuarioId);
        console.log("IDs de usuarios:", usuarioIds);
        if (usuarioIds.length === 0) return;
        const dataPersonas = await getPersonasPorUsuarios(usuarioIds);
        setPersonas(dataPersonas);
        console.log("Personas obtenidas:", dataPersonas);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }

      
    }
    fetchUsuario();
    fetchSuscripcion();
    fetchPlans();
    console.log("Personas",personas)
  }, [inquilinos]);


  //Manejar cambio estado inquilino
  const handleChangeEstado = async (estado: boolean) => {
    console.log("Antes del update:", inquilinos[0]);
    console.log("Estado del inquilino:", estado);
    try {
      const inquilinoActual = inquilinos[0];
      const formDataActualizado = {
        ...inquilinoActual,
        estadoInquilino: estado,
        suscripcionId: suscripcion?.id,
      };
      await updateTenant({
        formData: formDataActualizado,
        inquilinoId: inquilinoActual.inquilinoId,
      });
      console.log("Después del update:", inquilinos[0]);

      // Forzamos la recarga de datos desde el backend
      queryClient.invalidateQueries({ queryKey: ["editTenant", inquilinoActual.inquilinoId] });
    } catch (error) {
      console.error("Error al cambiar el estado del inquilino:", error);
    }
  }


  //Manejador de creación de suscripción
  const handleCreateSuscripcion = async (data: { estado: boolean; diasActivo: number; planId: string }) => {
    try {
      setIsLoadingModal(true);
  
      const nuevaSuscripcion = await createSuscripcion(data);
      const inquilinoActual = inquilinos[0];
  
      const formDataActualizado = {
        ...inquilinoActual,
        suscripcionId: nuevaSuscripcion.id,
      };
  
      await updateTenant({
        formData: formDataActualizado,
        inquilinoId: inquilinoActual.inquilinoId,
      });
      

      // Actualizar estados y re-render
      setSuscripcionId(nuevaSuscripcion.id);
  
      const fetched = await getSuscripcionById(nuevaSuscripcion.id);
      setSuscripcion(fetched);
  
      setShowModal(false);
    } catch (error) {
      console.error("Error al crear o asignar la suscripción:", error);
    } finally {
      setIsLoadingModal(false);
    }
  };

  //Manejador de Envio de correo
  const handleSendEmail = async () => {
    try {
      // Aquí se debe implementar la lógica para enviar el correo
      console.log("Enviando correo...");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  return (
    <div className="space-y-8">
      {inquilinos.map((inquilino) => (
        <div
          key={inquilino.inquilinoId}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col space-y-6 border border-gray-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-gray-800">{inquilino.nombreInquilino}</h2>
            <button
              onClick={() => handleChangeEstado(!inquilino.estadoInquilino)}
              className={`px-4 py-2 text-sm font-bold rounded-lg focus:outline-none ${
                inquilino.estadoInquilino
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
              }`}
            >
              {inquilino.estadoInquilino ? 'Activo' : 'Inactivo'}
            </button>
          </div>

          {/* Info general */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-gray-700"><span className="font-semibold">RUT:</span> {inquilino.rutInquilino}</p>
              <p className="text-gray-700"><span className="font-semibold">Teléfono:</span> {inquilino.telefonoInquilino}</p>
              <p className="text-gray-700"><span className="font-semibold">Correo:</span> {inquilino.correoInquilino}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700"><span className="font-semibold">Dirección:</span> {inquilino.direccionInquilino}</p>
              <p className="text-gray-700"><span className="font-semibold">Sector:</span> {inquilino.sectorE}</p>
              <p className="text-gray-700"><span className="font-semibold">Subsector:</span> {inquilino.subSectorE}</p>
            </div>
          </div>

          {/* Suscripción nueva */}
          {suscripcionId === 1 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 border border-gray-300 rounded-xl shadow-sm transition duration-200 ease-in-out"
              >
                <span>Crear y asignar una suscripción a este inquilino</span>
              </button>
            </div>
          )}

          {/* Suscripción existente */}
          {suscripcionId !== 1 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Suscripción</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Estado y Días Activo */}
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span
                      className={`px-2 py-1 text-sm font-bold rounded-lg ${
                        inquilinos[0].suscripcion.estado
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {inquilinos[0].suscripcion.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Días Activo:</span>{' '}
                    {inquilinos[0].suscripcion.diasActivo}
                  </p>
                </div>

                {/* Nombre del Plan */}
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Su plan actual</p>
                  <p className="text-gray-800 text-lg font-semibold">
                    {suscripcion?.plan.nombrePlan}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modal */}
          <CrearSuscripcionModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            plans={plans}
            onSubmit={handleCreateSuscripcion}
            isLoading={isLoadingModal}
          />

          {/* Administradores */}
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Administradores de la Empresa</h3>
              <button className="bg-gray-900 text-gray-100 text-xl w-10 h-10 rounded-full hover:bg-gray-700 transition duration-200"
              onClick={handleSendEmail}
              >+</button>
            </div>
            <div className="flex space-x-4 overflow-x-auto p-4">
              {personas.map((persona, index) => (
                <div key={index} className="relative w-64 bg-white shadow-lg rounded-2xl p-4 border border-gray-200 flex-shrink-0">
                  <div className="absolute top-2 left-2 w-10 h-10 bg-gray-100 text-gray-90 flex items-center justify-center font-bold text-lg rounded-full">
                    {persona.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="mt-8 space-y-2">
                    <p className="text-gray-700 font-semibold">{persona.nombre} {persona.primerApellido}</p>
                    
                    <p className="text-gray-400 text-sm">Telefono: {persona.telefono}</p>
                    <p className="text-gray-400 text-sm">Correo contacto: {persona.usuario.correoUsuario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}