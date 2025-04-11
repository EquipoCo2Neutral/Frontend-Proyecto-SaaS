import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { PlantaRegisterForm } from "types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/axios";

type PlantFormProps = {
  register: UseFormRegister<PlantaRegisterForm>;
  errors: FieldErrors<PlantaRegisterForm>;
};

export default function PlantForm({ errors, register }: PlantFormProps) {
  const [selectedPais, setSelectedPais] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Fetch PAISES
  const { data: paises = [], isLoading: loadingPaises } = useQuery({
    queryKey: ["paises"],
    queryFn: async () => {
      const { data } = await api("/paises");
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
  });

  // Fetch REGIONES (dependiente de país)
  const { data: regiones = [], isLoading: loadingRegiones } = useQuery({
    queryKey: ["regiones", selectedPais],
    queryFn: async () => {
      if (!selectedPais) return [];
      const { data } = await api(`/regiones?pais_id=${selectedPais}`);
      return data;
    },
    enabled: !!selectedPais, // solo corre si hay país seleccionado
  });

  // Fetch COMUNAS (dependiente de región)
  const { data: comunas = [], isLoading: loadingComunas } = useQuery({
    queryKey: ["comunas", selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      const { data } = await api(`/comunas?region_id=${selectedRegion}`);
      return data;
    },
    enabled: !!selectedRegion,
  });

  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="nombrePlanta" className="text-sm uppercase font-bold">
          Nombre de la Planta
        </label>
        <input
          id="nombrePlanta"
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Ingresa el nombre de la planta"
          {...register("nombre", {
            required: "El nombre del planta es obligatorio",
          })}
        />
        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="direccion" className="text-sm uppercase font-bold">
          Dirección de la Planta
        </label>
        <input
          id="direccion"
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Ingresa la dirección de la planta"
          {...register("direccion", {
            required: "La dirección es obligatoria",
          })}
        />
        {errors.direccion && (
          <ErrorMessage>{errors.direccion.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="gestorPlanta" className="text-sm uppercase font-bold">
          Gestor de la Planta
        </label>
        <input
          id="gestorPlanta"
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Gestor encargado de la planta"
          {...register("usuarioId", {
            required: "El gestor es obligatorio",
          })}
        />
        {errors.usuarioId && (
          <ErrorMessage>{errors.usuarioId.message}</ErrorMessage>
        )}
      </div>

      {/* País */}
      <div className="mb-5 space-y-3">
        <label htmlFor="paisPlanta" className="text-sm uppercase font-bold">
          País
        </label>
        <select
          id="paisPlanta"
          className="w-full p-3 border border-gray-200"
          value={selectedPais}
          onChange={(e) => {
            setSelectedPais(e.target.value);
            setSelectedRegion(""); // reset región
          }}
        >
          <option value="">Seleccione un país</option>
          {loadingPaises ? (
            <option disabled>Cargando países...</option>
          ) : (
            paises.map((pais: any) => (
              <option key={pais.idPais} value={pais.idPais}>
                {pais.nombre}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Región */}
      <div className="mb-5 space-y-3">
        <label htmlFor="regionPlanta" className="text-sm uppercase font-bold">
          Región
        </label>
        <select
          id="regionPlanta"
          className="w-full p-3 border border-gray-200"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          disabled={!selectedPais}
        >
          <option value="">Seleccione una región</option>
          {loadingRegiones ? (
            <option disabled>Cargando regiones...</option>
          ) : (
            regiones.map((region: any) => (
              <option key={region.idRegion} value={region.idRegion}>
                {region.nombre}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Comuna */}
      <div className="mb-5 space-y-3">
        <label htmlFor="comunaPlanta" className="text-sm uppercase font-bold">
          Comuna
        </label>
        <select
          id="comunaPlanta"
          className="w-full p-3 border border-gray-200"
          {...register("comunaId", {
            required: "La comuna es obligatoria",
          })}
          disabled={!selectedRegion}
        >
          <option value="">Seleccione una comuna</option>
          {loadingComunas ? (
            <option disabled>Cargando comunas...</option>
          ) : (
            comunas.map((comuna: any) => (
              <option key={comuna.idComuna} value={comuna.idComuna}>
                {comuna.nombre}
              </option>
            ))
          )}
        </select>
        {errors.comunaId && (
          <ErrorMessage>{errors.comunaId.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
