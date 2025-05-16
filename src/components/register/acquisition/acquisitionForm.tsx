import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect, useRef } from "react";
import ErrorMessage from "../../ErrorMessage";
import { AdquisicionFormData } from "@/types/index";
import { useTransacciones } from "../../../hooks/useTransaccione";
import { useGrupoE } from "../../../hooks/useGrupoEnergetico";
import { useEnergeticosPorGrupo } from "../../../hooks/useEnergetico";
import { useUnidadesByEnergetico } from "../../../hooks/useUnidad";
import { usePaises } from "../../../hooks/usePais";

interface AdquisicionFormProps {
  register: UseFormRegister<AdquisicionFormData>;
  errors: FieldErrors<AdquisicionFormData>;
  watch: UseFormWatch<AdquisicionFormData>;
  setValue: UseFormSetValue<AdquisicionFormData>;
}

export default function AdquisicionForm({
  register,
  errors,
  watch,
  setValue,
}: AdquisicionFormProps) {
  const { data: transacciones, isLoading } = useTransacciones();
  const { data: gruposEnergeticos, isLoading: loadingGrupos } = useGrupoE();
  const { data: energeticos, isLoading: energeticosLoading } =
    useEnergeticosPorGrupo(Number(watch("idGrupoEnergetico")));
  const { data: unidades, isLoading: loadingUnidades } =
    useUnidadesByEnergetico(Number(watch("idEnergetico")));
  const { data: paises, isLoading: loadingPaises } = usePaises();

  const idTransaccion = watch("idTransaccion");
  const idGrupoEnergetico = watch("idGrupoEnergetico");
  const idEnergetico = watch("idEnergetico");

  const parsedIdEnergetico = Number(idEnergetico);
  const parsedIdTransaccion = Number(idTransaccion);
  const parsedIdGrupoEnergetico = Number(idGrupoEnergetico);

  const prevGrupoRef = useRef<number | null>(null);

  // Reset dinámico al cambiar de grupo energético
  useEffect(() => {
    if (
      parsedIdGrupoEnergetico &&
      prevGrupoRef.current !== null &&
      prevGrupoRef.current !== parsedIdGrupoEnergetico
    ) {
      setValue("idEnergetico", "");
      setValue("idUnidad", "");
    }
    prevGrupoRef.current = parsedIdGrupoEnergetico;
  }, [parsedIdGrupoEnergetico, setValue]);

  // Limpiar campos condicionales al cambiar transacción o energético
  useEffect(() => {
    if (parsedIdTransaccion !== 2) {
      setValue("idPaisOrigen", null);
    }
    if (parsedIdTransaccion !== 3) {
      setValue("cantidadInicial", null);
      setValue("cantidadFinal", null);
    }
    if (!(parsedIdTransaccion === 1 && parsedIdEnergetico === 43)) {
      setValue("compraMercadoSpot", null);
    }
    if (parsedIdTransaccion !== 1) {
      setValue("empresaOrigen", "");
    }

    const energeticosConPoderCalorifico = [
      1, 2, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 22, 23, 25, 26, 29,
    ];
    const energeticosConHumedad = [8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20];

    if (!energeticosConPoderCalorifico.includes(parsedIdEnergetico)) {
      setValue("poderCalorifico", null);
    }

    if (!energeticosConHumedad.includes(parsedIdEnergetico)) {
      setValue("porcentajeHumedad", null);
    }
  }, [parsedIdTransaccion, parsedIdEnergetico, setValue]);

  const showUnidadYCantidad =
    !!parsedIdTransaccion || !!parsedIdGrupoEnergetico;
  const showPaisOrigen = parsedIdTransaccion === 2;
  const showCantidadInicialFinal = parsedIdTransaccion === 3;
  const showCompraSpot = parsedIdTransaccion === 1 && parsedIdEnergetico === 43;
  const showEmpresaOrigen = parsedIdTransaccion === 1;

  const showPoderCalorifico = [
    1, 2, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 22, 23, 25, 26, 29,
  ].includes(parsedIdEnergetico);
  const showPorcentajeHumedad = [
    8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20,
  ].includes(parsedIdEnergetico);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* idTransaccion */}
      <div>
        <label htmlFor="idTransaccion" className="text-sm font-bold uppercase">
          Tipo de Transacción
        </label>
        <select
          id="idTransaccion"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("idTransaccion", {
            required: "La transacción es requerida",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            {isLoading ? "Cargando..." : "Seleccione una transacción"}
          </option>
          {transacciones?.map((t) => (
            <option key={t.idTransaccion} value={t.idTransaccion}>
              {t.nombreTransaccion}
            </option>
          ))}
        </select>
        {errors.idTransaccion && (
          <ErrorMessage>{errors.idTransaccion.message}</ErrorMessage>
        )}
      </div>

      {/* idGrupoEnergetico */}
      <div>
        <label
          htmlFor="idGrupoEnergetico"
          className="text-sm font-bold uppercase"
        >
          Grupo Energético
        </label>
        <select
          id="idGrupoEnergetico"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("idGrupoEnergetico", {
            required: "El grupo energético es requerido",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            {loadingGrupos ? "Cargando..." : "Seleccione un grupo energético"}
          </option>
          {gruposEnergeticos?.map((g) => (
            <option key={g.idGrupoEnergetico} value={g.idGrupoEnergetico}>
              {g.nombreGrupoEnergetico}
            </option>
          ))}
        </select>
        {errors.idGrupoEnergetico && (
          <ErrorMessage>{errors.idGrupoEnergetico.message}</ErrorMessage>
        )}
      </div>

      {/* idEnergetico */}
      <div>
        <label htmlFor="idEnergetico" className="text-sm font-bold uppercase">
          Energético
        </label>
        <select
          id="idEnergetico"
          className="w-full p-2 border border-gray-300 rounded"
          disabled={energeticosLoading || !idGrupoEnergetico}
          {...register("idEnergetico", {
            required: "El energético es requerido",
          })}
        >
          <option value="" disabled>
            {energeticosLoading ? "Cargando..." : "Seleccione un energético"}
          </option>
          {energeticos?.map((e) => (
            <option key={e.idEnergetico} value={e.idEnergetico}>
              {e.nombreEnergetico}
            </option>
          ))}
        </select>
        {errors.idEnergetico && (
          <ErrorMessage>{errors.idEnergetico.message}</ErrorMessage>
        )}
      </div>

      {/* Unidad y Cantidad */}
      {showUnidadYCantidad && (
        <>
          <div>
            <label htmlFor="idUnidad" className="text-sm font-bold uppercase">
              Unidad
            </label>
            <select
              id="idUnidad"
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!parsedIdEnergetico || loadingUnidades}
              {...register("idUnidad", {
                required: "La unidad es requerida",
              })}
            >
              <option value="" disabled>
                {loadingUnidades ? "Cargando..." : "Seleccione una unidad"}
              </option>
              {unidades?.map((u) => (
                <option key={u.idUnidad} value={u.idUnidad}>
                  {u.nombreUnidad}
                </option>
              ))}
            </select>
            {errors.idUnidad && (
              <ErrorMessage>{errors.idUnidad.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label htmlFor="Cantidad" className="text-sm font-bold uppercase">
              Cantidad
            </label>
            <input
              id="Cantidad"
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("Cantidad", {
                required: "La cantidad es requerida",
                min: {
                  value: 0,
                  message: "La cantidad no puede ser menor que 0",
                },
              })}
            />
            {errors.Cantidad && (
              <ErrorMessage>{errors.Cantidad.message}</ErrorMessage>
            )}
          </div>
        </>
      )}

      {/* País de origen */}
      {showPaisOrigen && (
        <div>
          <label htmlFor="idPaisOrigen" className="text-sm font-bold uppercase">
            País de Origen
          </label>
          <select
            id="idPaisOrigen"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("idPaisOrigen", {
              required: "El país de origen es requerido",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              {loadingPaises ? "Cargando..." : "Seleccione un país"}
            </option>
            {paises?.map((p) => (
              <option key={p.idPais} value={p.idPais}>
                {p.nombre}
              </option>
            ))}
          </select>
          {errors.idPaisOrigen && (
            <ErrorMessage>{errors.idPaisOrigen.message}</ErrorMessage>
          )}
        </div>
      )}

      {/* Cantidad inicial y final */}
      {showCantidadInicialFinal && (
        <>
          <div>
            <label
              htmlFor="cantidadInicial"
              className="text-sm font-bold uppercase"
            >
              Cantidad Inicial
            </label>
            <input
              id="cantidadInicial"
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("cantidadInicial", {
                required: "La cantidad inicial es requerida",
                min: { value: 0, message: "No puede ser menor que 0" },
              })}
            />
            {errors.cantidadInicial && (
              <ErrorMessage>{errors.cantidadInicial.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label
              htmlFor="cantidadFinal"
              className="text-sm font-bold uppercase"
            >
              Cantidad Final
            </label>
            <input
              id="cantidadFinal"
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("cantidadFinal", {
                required: "La cantidad final es requerida",
                min: { value: 0, message: "No puede ser menor que 0" },
              })}
            />
            {errors.cantidadFinal && (
              <ErrorMessage>{errors.cantidadFinal.message}</ErrorMessage>
            )}
          </div>
        </>
      )}

      {showCompraSpot && (
        <div>
          <label
            htmlFor="compraMercadoSpot"
            className="text-sm font-bold uppercase"
          >
            Compra en Mercado Spot
          </label>
          <input
            id="compraMercadoSpot"
            type="checkbox"
            className="h-4 w-4 ml-2"
            {...register("compraMercadoSpot")}
          />
        </div>
      )}

      {showEmpresaOrigen && (
        <div>
          <label
            htmlFor="empresaOrigen"
            className="text-sm font-bold uppercase"
          >
            Empresa Origen
          </label>
          <input
            id="empresaOrigen"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("empresaOrigen")}
          />
        </div>
      )}

      {showPoderCalorifico && (
        <div>
          <label
            htmlFor="poderCalorifico"
            className="text-sm font-bold uppercase"
          >
            Poder Calorífico
          </label>
          <input
            id="poderCalorifico"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("poderCalorifico", {
              min: { value: 0, message: "No puede ser menor que 0" },
            })}
          />
          {errors.poderCalorifico && (
            <ErrorMessage>{errors.poderCalorifico.message}</ErrorMessage>
          )}
        </div>
      )}

      {showPorcentajeHumedad && (
        <div>
          <label
            htmlFor="porcentajeHumedad"
            className="text-sm font-bold uppercase"
          >
            % Humedad
          </label>
          <input
            id="porcentajeHumedad"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("porcentajeHumedad", {
              min: { value: 0, message: "No puede ser menor que 0" },
              max: { value: 100, message: "No puede ser mayor que 100" },
            })}
          />
          {errors.porcentajeHumedad && (
            <ErrorMessage>{errors.porcentajeHumedad.message}</ErrorMessage>
          )}
        </div>
      )}
    </div>
  );
}
