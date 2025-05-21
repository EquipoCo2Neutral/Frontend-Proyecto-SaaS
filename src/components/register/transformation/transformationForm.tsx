import { TransformacionFormData } from "@/types";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  useEnergeticosPorMesProceso,
  useEnergeticosPorMesProcesoYProduccionBruta,
} from "@/hooks/useAdquisiciones";
import { useUnidadesByEnergetico } from "@/hooks/useUnidad";
import { useEffect } from "react";
import ErrorMessage from "../../ErrorMessage";

interface TransformationFormProps {
  register: UseFormRegister<TransformacionFormData>;
  errors: FieldErrors<TransformacionFormData>;
  watch: UseFormWatch<TransformacionFormData>;
  setValue: UseFormSetValue<TransformacionFormData>;
}

export default function TransformationForm({
  register,
  errors,
  watch,
  setValue,
}: TransformationFormProps) {
  const idMesProceso = watch("idMesProceso");
  const idEnergetico = watch("idEnergetico");

  const { data: energeticos, isLoading: loadingEnergeticos } =
    useEnergeticosPorMesProceso(idMesProceso);

  const { data: unidades, isLoading: loadingUnidades } =
    useUnidadesByEnergetico(Number(idEnergetico));

  const { data: energeticosProducidos, isLoading: loadingProducidos } =
    useEnergeticosPorMesProcesoYProduccionBruta(idMesProceso);

  // Limpiar unidad y cantidad al cambiar el energético
  useEffect(() => {
    setValue("cantidad", 0);
    setValue("idUnidad", "");
    setValue("idEnergeticoProducido", "");
  }, [idEnergetico, setValue]);

  return (
    <div className="w-full space-y-6">
      {/* Campo Energético a Transformar */}
      <div className="w-full">
        <label htmlFor="idEnergetico" className="text-sm font-bold uppercase">
          Energético a Transformar
        </label>
        <select
          id="idEnergetico"
          className="w-full p-2 border border-gray-300 rounded"
          disabled={loadingEnergeticos || !idMesProceso}
          {...register("idEnergetico", {
            required: "El energético es requerido",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            {loadingEnergeticos ? "Cargando..." : "Seleccione un energético"}
          </option>
          {energeticos?.map((energetico) => (
            <option key={energetico.id} value={energetico.id}>
              {energetico.nombre}
            </option>
          ))}
        </select>
        {errors.idEnergetico && (
          <ErrorMessage>{errors.idEnergetico.message}</ErrorMessage>
        )}
      </div>

      {/* Cantidad y Unidad en una fila */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        {/* Campo Cantidad */}
        <div className="w-full md:w-1/2">
          <label htmlFor="cantidad" className="text-sm font-bold uppercase">
            Cantidad
          </label>
          <input
            type="number"
            step="any"
            id="cantidad"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("cantidad", {
              required: "La cantidad es requerida",
              min: {
                value: 0.0001,
                message: "La cantidad debe ser mayor que cero",
              },
            })}
          />
          {errors.cantidad && (
            <ErrorMessage>{errors.cantidad.message}</ErrorMessage>
          )}
        </div>

        {/* Campo Unidad */}
        <div className="w-full md:w-1/2">
          <label htmlFor="idUnidad" className="text-sm font-bold uppercase">
            Unidad
          </label>
          <select
            id="idUnidad"
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loadingUnidades || !idEnergetico}
            {...register("idUnidad", {
              required: "La unidad es requerida",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              {loadingUnidades ? "Cargando..." : "Seleccione una unidad"}
            </option>
            {unidades?.map((unidad) => (
              <option key={unidad.idUnidad} value={unidad.idUnidad}>
                {unidad.nombreUnidad}
              </option>
            ))}
          </select>
          {errors.idUnidad && (
            <ErrorMessage>{errors.idUnidad.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Campo Energético Producido */}
      <div className="w-full">
        <label
          htmlFor="idEnergeticoProducido"
          className="text-sm font-bold uppercase"
        >
          Energético Producido
        </label>
        <select
          id="idEnergeticoProducido"
          className="w-full p-2 border border-gray-300 rounded"
          disabled={loadingProducidos || !idMesProceso}
          {...register("idEnergeticoProducido", {
            required: "El energético producido es requerido",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            {loadingProducidos ? "Cargando..." : "Seleccione un energético"}
          </option>
          {energeticosProducidos?.map((energetico) => (
            <option key={energetico.id} value={energetico.id}>
              {energetico.nombre}
            </option>
          ))}
        </select>
        {errors.idEnergeticoProducido && (
          <ErrorMessage>{errors.idEnergeticoProducido.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
}
