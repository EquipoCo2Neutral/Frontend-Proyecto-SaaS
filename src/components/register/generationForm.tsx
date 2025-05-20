import { useEffect } from "react";
import { useUnidadesByIds, useUnidadesByEnergetico } from "@/hooks/useUnidad";
import { useEnergeticosPorMesProceso } from "@/hooks/useAdquisiciones";
import { GeneracionFormData } from "@/types";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";

interface GenerationFormProps {
  register: UseFormRegister<GeneracionFormData>;
  errors: FieldErrors<GeneracionFormData>;
  watch: UseFormWatch<GeneracionFormData>;
  setValue: UseFormSetValue<GeneracionFormData>;
}

const tipoOptionsByTecnologia = {
  3: [
    { value: "Embalse", label: "Embalse" },
    { value: "De pasada", label: "De pasada" },
  ],
  4: [
    { value: "Grupo electrógeno", label: "Grupo electrógeno" },
    { value: "Cogeneración", label: "Cogeneración" },
    { value: "N/A", label: "N/A" },
  ],
};

export default function GenerationForm({
  register,
  errors,
  watch,
  setValue,
}: GenerationFormProps) {
  const { idMesProceso } = useParams();

  const selectedTecnologia = Number(watch("idTecnologia"));
  const selectedEnergetico = Number(watch("idEnergetico"));

  const { data: unidadesCI } = useUnidadesByIds([118, 119]);
  const { data: unidadesCGB } = useUnidadesByEnergetico(43);

  const { data: unidadesCENA } = useUnidadesByEnergetico(43);
  const { data: unidadesCE } = useUnidadesByEnergetico(selectedEnergetico);

  const { data: energeticos = [] } = useEnergeticosPorMesProceso(
    idMesProceso ?? ""
  );

  const selectedTipo = watch("Tipo") ?? "";

  // Limpiar Tipo si cambia la tecnología
  useEffect(() => {
    setValue("Tipo", "");
  }, [selectedTecnologia, setValue]);

  useEffect(() => {
    if (selectedTecnologia !== 4) {
      setValue("idEnergetico", null);
    }
  }, [selectedTecnologia, setValue]);

  // Limpiar unidad consumo energético si cambia energetico
  useEffect(() => {
    setValue("idUnidad_Ce", null);
  }, [selectedEnergetico, setValue]);

  const handleTipoChange = (value: string) => {
    setValue("Tipo", value);
  };

  return (
    <div className="space-y-6">
      {/* Tecnología */}
      <div>
        <label
          htmlFor="idTecnologia"
          className="block text-sm font-semibold mb-1"
        >
          Tecnología *
        </label>
        <select
          id="idTecnologia"
          {...register("idTecnologia", {
            required: "La tecnología es obligatoria",
          })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Selecciona la tecnología</option>
          <option value="1">Solar</option>
          <option value="2">Eólica</option>
          <option value="3">Hídrica</option>
          <option value="4">Térmica</option>
          <option value="5">Geotermia</option>
        </select>
        {errors.idTecnologia && (
          <p className="text-red-500 text-sm mt-1">
            {errors.idTecnologia.message}
          </p>
        )}
      </div>

      {/* Radio buttons Tipo si idTecnologia es 3 o 4 */}
      {(selectedTecnologia === 3 || selectedTecnologia === 4) && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Tipo:</p>
          <div className="flex gap-4 flex-wrap">
            {(tipoOptionsByTecnologia[selectedTecnologia] ?? []).map(
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
          {errors.Tipo && (
            <p className="text-red-500 text-sm mt-1">{errors.Tipo.message}</p>
          )}
        </div>
      )}

      {/* El resto de tu formulario sigue igual... */}
      {/* Capacidad Instalada + Unidad CI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="capacidadInstalada"
            className="block text-sm font-semibold mb-1"
          >
            Capacidad Instalada *
          </label>
          <input
            type="number"
            id="capacidadInstalada"
            {...register("capacidadInstalada", {
              required: "La capacidad instalada es obligatoria",
              min: { value: 0, message: "Debe ser un valor positivo" },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.capacidadInstalada && (
            <p className="text-red-500 text-sm mt-1">
              {errors.capacidadInstalada.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="idUnidad_Ci"
            className="block text-sm font-semibold mb-1"
          >
            Unidad CI *
          </label>
          <select
            id="idUnidad_Ci"
            {...register("idUnidad_Ci", {
              required: "La unidad CI es obligatoria",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecciona una unidad</option>
            {unidadesCI?.map((unidad) => (
              <option key={unidad.idUnidad} value={unidad.idUnidad}>
                {unidad.nombreUnidad}
              </option>
            ))}
          </select>
          {errors.idUnidad_Ci && (
            <p className="text-red-500 text-sm mt-1">
              {errors.idUnidad_Ci.message}
            </p>
          )}
        </div>
      </div>

      {/* Cantidad Energía No Aprovechada + Unidad Cena - solo si idTecnologia 1,2,3 */}
      {(selectedTecnologia === 1 ||
        selectedTecnologia === 2 ||
        selectedTecnologia === 3) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="cantidadEnergiaNoAprovechada"
              className="block text-sm font-semibold mb-1"
            >
              Cantidad Energía No Aprovechada *
            </label>
            <input
              type="number"
              id="cantidadEnergiaNoAprovechada"
              {...register("cantidadEnergiaNoAprovechada", {
                required:
                  "La cantidad de energía no aprovechada es obligatoria",
                min: { value: 0, message: "Debe ser un valor positivo" },
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.cantidadEnergiaNoAprovechada && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cantidadEnergiaNoAprovechada.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="idUnidad_Cena"
              className="block text-sm font-semibold mb-1"
            >
              Unidad Cena *
            </label>
            <select
              id="idUnidad_Cena"
              {...register("idUnidad_Cena", {
                required: "La unidad Cena es obligatoria",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona una unidad</option>
              {unidadesCENA?.map((unidad) => (
                <option key={unidad.idUnidad} value={unidad.idUnidad}>
                  {unidad.nombreUnidad}
                </option>
              ))}
            </select>
            {errors.idUnidad_Cena && (
              <p className="text-red-500 text-sm mt-1">
                {errors.idUnidad_Cena.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Cantidad Generada Bruta + Unidad CGB + Observaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="cantidadGeneradaBruta"
            className="block text-sm font-semibold mb-1"
          >
            Cantidad Generada Bruta *
          </label>
          <input
            type="number"
            step="0.01"
            id="cantidadGeneradaBruta"
            {...register("cantidadGeneradaBruta", {
              required: "La cantidad generada bruta es obligatoria",
              min: { value: 0, message: "Debe ser un valor positivo" },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.cantidadGeneradaBruta && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cantidadGeneradaBruta.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="idUnidad_Cgb"
            className="block text-sm font-semibold mb-1"
          >
            Unidad CGB *
          </label>
          <select
            id="idUnidad_Cgb"
            {...register("idUnidad_CGB", {
              required: "La unidad CGB es obligatoria",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecciona una unidad</option>
            {unidadesCGB?.map((unidad) => (
              <option key={unidad.idUnidad} value={unidad.idUnidad}>
                {unidad.nombreUnidad}
              </option>
            ))}
          </select>
          {errors.idUnidad_CGB && (
            <p className="text-red-500 text-sm mt-1">
              {errors.idUnidad_CGB.message}
            </p>
          )}
        </div>
      </div>
      {/* Uso de energético + Consumo energético y Unidad CE solo si idTecnologia === 4 */}
      {selectedTecnologia === 4 && (
        <>
          <div>
            <h3 className="text-sm font-semibold mb-1">Uso de energético</h3>
            <select
              id="idEnergetico"
              {...register("idEnergetico", {
                required: "El energético es obligatorio",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona un energético</option>
              {energeticos.map((energetico) => (
                <option key={energetico.id} value={energetico.id}>
                  {energetico.nombre}
                </option>
              ))}
            </select>
            {errors.idEnergetico && (
              <p className="text-red-500 text-sm mt-1">
                {errors.idEnergetico.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="consumoEnergetico"
                className="block text-sm font-semibold mb-1"
              >
                Consumo energético *
              </label>
              <input
                type="number"
                step="0.01"
                id="consumoEnergetico"
                {...register("consumoEnergetico", {
                  required: "El consumo energético es obligatorio",
                  min: { value: 0, message: "Debe ser un valor positivo" },
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.consumoEnergetico && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.consumoEnergetico.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="idUnidad_Ce"
                className="block text-sm font-semibold mb-1"
              >
                Unidad CE *
              </label>
              <select
                id="idUnidad_Ce"
                {...register("idUnidad_Ce", {
                  required: "La unidad CE es obligatoria",
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecciona una unidad</option>
                {unidadesCE?.map((unidad) => (
                  <option key={unidad.idUnidad} value={unidad.idUnidad}>
                    {unidad.nombreUnidad}
                  </option>
                ))}
              </select>
              {errors.idUnidad_Ce && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.idUnidad_Ce.message}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Observaciones */}
      <div>
        <label
          htmlFor="observaciones"
          className="block text-sm font-semibold mb-1"
        >
          Observaciones
        </label>
        <textarea
          id="observaciones"
          rows={4}
          {...register("Observaciones")}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
}
