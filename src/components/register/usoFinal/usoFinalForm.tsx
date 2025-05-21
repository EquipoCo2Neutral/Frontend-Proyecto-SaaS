import { UFFormData } from "@/types";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useEnergeticosPorMesProceso } from "@/hooks/useAdquisiciones";
import { useUnidadesByEnergetico } from "@/hooks/useUnidad";
import { useCategoriasUF } from "@/hooks/useCategoriaUF";
import { useTipoUFPorCategoria } from "@/hooks/useCategoriaUF";
import ErrorMessage from "../../ErrorMessage";
import { useEffect } from "react";

interface UsoFinalFormProps {
  register: UseFormRegister<UFFormData>;
  errors: FieldErrors<UFFormData>;
  watch: UseFormWatch<UFFormData>;
  setValue: UseFormSetValue<UFFormData>;
}

const tipoOptionsByCategoria = {
  1: [
    {
      value: "dentro del establecimiento o instalaciones de la empresa",
      label: "dentro del establecimiento o instalaciones de la empresa",
    },
    { value: "Nacional", label: "Nacional" },
    { value: "Internacional", label: "Internacional" },
  ],
};

export default function UsoFinalForm({
  register,
  errors,
  watch,
  setValue,
}: UsoFinalFormProps) {
  const idMesProceso = watch("idMesProceso");
  const idEnergetico = watch("idEnergetico");
  const idCategoriaUF = Number(watch("idCategoriaUF"));

  const idTipoUF = Number(watch("idTipoUF"));

  const { data: energeticos, isLoading: loadingEnergeticos } =
    useEnergeticosPorMesProceso(idMesProceso);

  const { data: unidades, isLoading: loadingUnidades } =
    useUnidadesByEnergetico(Number(idEnergetico));

  const { data: categoriasUF, isLoading: loadingCategorias } =
    useCategoriasUF();

  const { data: tiposUF, isLoading: loadingTiposUF } =
    useTipoUFPorCategoria(idCategoriaUF);

  const selectedTipo = watch("tipo") ?? "";

  // Limpiar unidad al cambiar energético
  useEffect(() => {
    setValue("idUnidad", "");
  }, [idEnergetico, setValue]);

  // Limpiar tipo uso final al cambiar categoría
  useEffect(() => {
    setValue("idTipoUF", null);
  }, [idCategoriaUF, setValue]);

  const handleTipoChange = (value: string) => {
    setValue("tipo", value);
  };

  return (
    <div className="w-full space-y-6">
      {/* Campo Energético */}
      <div className="w-full">
        <label htmlFor="idEnergetico" className="text-sm font-bold uppercase">
          Energético
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

      {/* Campo Categoría Uso Final */}
      <div className="w-full">
        <label htmlFor="idCategoriaUF" className="text-sm font-bold uppercase">
          Categoría Uso Final
        </label>
        <select
          id="idCategoriaUF"
          className="w-full p-2 border border-gray-300 rounded"
          disabled={loadingCategorias}
          {...register("idCategoriaUF", {
            required: "La categoría de uso final es requerida",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            {loadingCategorias
              ? "Cargando..."
              : "Seleccione una categoría de uso final"}
          </option>
          {categoriasUF?.map((categoria) => (
            <option
              key={categoria.idCategoriaUF}
              value={categoria.idCategoriaUF}
            >
              {categoria.nombreCategoria}
            </option>
          ))}
        </select>
        {errors.idCategoriaUF && (
          <ErrorMessage>{errors.idCategoriaUF.message}</ErrorMessage>
        )}
      </div>

      {/* Radio buttons Tipo si idTecnologia es 3 o 4 */}
      {idCategoriaUF === 1 && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Tipo:</p>
          <div className="flex gap-4 flex-wrap">
            {(tipoOptionsByCategoria[idCategoriaUF] ?? []).map(
              ({ value, label }) => (
                <label
                  key={value}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    value={value}
                    checked={selectedTipo === value}
                    onChange={() => handleTipoChange(value)}
                    className="form-radio h-5 w-5 text-purple-600"
                  />
                  <span className="ml-2">{label}</span>
                </label>
              )
            )}
          </div>
          {errors.tipo && (
            <p className="text-red-500 text-sm mt-1">{errors.tipo.message}</p>
          )}
        </div>
      )}

      {/* Campo Tipo Uso Final (solo si la categoría es 1,2,3,5) */}
      {[1, 2, 3, 5].includes(idCategoriaUF) && (
        <div className="w-full">
          <label htmlFor="idTipoUF" className="text-sm font-bold uppercase">
            Tipo de Uso Final
          </label>
          <select
            id="idTipoUF"
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loadingTiposUF}
            {...register("idTipoUF", {
              required: "El tipo de uso final es requerido",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              {loadingTiposUF
                ? "Cargando..."
                : "Seleccione un tipo de uso final"}
            </option>
            {tiposUF?.map((tipo) => (
              <option key={tipo.idTipoUF} value={tipo.idTipoUF}>
                {tipo.nombreTipoUF}
              </option>
            ))}
          </select>
          {errors.idTipoUF && (
            <ErrorMessage>{errors.idTipoUF.message}</ErrorMessage>
          )}
        </div>
      )}

      {/* Campo Cantidad y Unidad */}
      <div className="flex gap-4">
        {/* Cantidad */}
        <div className="w-2/3">
          <label htmlFor="cantidad" className="text-sm font-bold uppercase">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            step="any"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("cantidad", {
              required: "La cantidad es requerida",
              min: { value: 0, message: "Debe ser un valor positivo" },
            })}
          />
          {errors.cantidad && (
            <ErrorMessage>{errors.cantidad.message}</ErrorMessage>
          )}
        </div>

        {/* Unidad */}
        <div className="w-1/3">
          <label htmlFor="idUnidad" className="text-sm font-bold uppercase">
            Unidad
          </label>
          <select
            id="idUnidad"
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!idEnergetico || loadingUnidades}
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

      {/* Textarea Detalle (si el tipo es 11 o 14) */}
      {[11, 14].includes(idTipoUF) && (
        <div className="w-full">
          <label htmlFor="detalle" className="text-sm font-bold uppercase">
            Detalle
          </label>
          <textarea
            id="detalle"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("detalle", {
              required: "El detalle es requerido para este tipo de uso final",
            })}
          />
          {errors.detalle && (
            <ErrorMessage>{errors.detalle.message}</ErrorMessage>
          )}
        </div>
      )}
    </div>
  );
}
