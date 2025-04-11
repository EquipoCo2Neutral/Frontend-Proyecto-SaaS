import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { PlantaRegisterForm } from "types";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

type PlantFormProps = {
  register: UseFormRegister<PlantaRegisterForm>;
  errors: FieldErrors<PlantaRegisterForm>;
};

type Pais = {
  idPais: number;
  nombre: string;
};

type Region = {
  idRegion: number;
  nombre: string;
};

type Comuna = {
  idComuna: number;
  nombre: string;
};

export default function PlantForm({ errors, register }: PlantFormProps) {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [selectedPais, setSelectedPais] = useState<string>("");
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [comunas, setComunas] = useState<Comuna[]>([]);
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await api("/paises");
        const { data } = await response;
        setPaises(data);
      } catch (error) {
        console.error("Error al obtener países:", error);
      }
    };

    fetchPaises();
  }, []);

  console.log(paises);

  useEffect(() => {
    const fetchRegiones = async () => {
      if (!selectedPais) return;
      try {
        const response = await api(`/regiones?pais_id=${selectedPais}`);
        const { data } = response;
        setRegiones(data);
      } catch (error) {
        console.error("Error al obtener regiones:", error);
      }
    };

    fetchRegiones();
  }, [selectedPais]);
  console.log(regiones);

  useEffect(() => {
    const fetchComunas = async () => {
      if (!selectedRegion) return;
      try {
        const response = await api(`/comunas?region_id=${selectedRegion}`);
        setComunas(response.data);
      } catch (error) {
        console.error("Error al obtener comunas:", error);
      }
    };
    fetchComunas();
  }, [selectedRegion]);
  //traer los gestores

  //traer los paises
  //traer las regiones por pais
  //traer las comunas por region
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="nombrePlanta" className="text-sm uppercase font-bold">
          Nombre de la Planta
        </label>
        <input
          id="nombrePlanta"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Ingresa el nombre de la planta"
          {...register("nombre", {
            required: "El nombre del planta es obligatorio",
          })}
        />

        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="direccionPlanta"
          className="text-sm uppercase font-bold"
        >
          Dirección de la Planta
        </label>
        <input
          id="direccion"
          className="w-full p-3  border border-gray-200"
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
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Getor encargado de la planta"
          {...register("usuarioId", {
            required: "El gestor es obligatorio",
          })}
        />

        {errors.usuarioId && (
          <ErrorMessage>{errors.usuarioId.message}</ErrorMessage>
        )}
      </div>
      {/* Select País (no registrado en el form) */}
      <div className="mb-5 space-y-3">
        <label htmlFor="paisPlanta" className="text-sm uppercase font-bold">
          País
        </label>
        <select
          id="paisPlanta"
          className="w-full p-3 border border-gray-200"
          value={selectedPais}
          onChange={(e) => setSelectedPais(e.target.value)}
        >
          <option value="">Seleccione un país</option>
          {paises.map((pais, index) => (
            <option key={pais.idPais ?? index} value={pais.idPais}>
              {pais.nombre}
            </option>
          ))}
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
          {regiones.map((region) => (
            <option key={region.idRegion} value={region.idRegion}>
              {region.nombre}
            </option>
          ))}
        </select>
      </div>
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
          {comunas.map((comuna) => (
            <option key={comuna.idComuna} value={comuna.idComuna}>
              {comuna.nombre}
            </option>
          ))}
        </select>

        {errors.comunaId && (
          <ErrorMessage>{errors.comunaId.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
