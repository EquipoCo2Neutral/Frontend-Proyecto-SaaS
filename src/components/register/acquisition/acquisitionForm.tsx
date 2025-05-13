import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { AdquisicionFormData } from "@/types/index";
import { useTransacciones } from "../../../hooks/useTransaccione";
import { useGrupoE } from "../../../hooks/useGrupoEnergetico";

interface AdquisicionFormProps {
  register: UseFormRegister<AdquisicionFormData>;
  errors: FieldErrors<AdquisicionFormData>;
  watch: UseFormWatch<AdquisicionFormData>;
}

export default function AdquisicionForm({
  register,
  errors,
  watch,
}: AdquisicionFormProps) {
  const { data: transacciones, isLoading } = useTransacciones();
  const { data: gruposEnergeticos, isLoading: loadingGrupos } = useGrupoE();
  const idTransaccion = watch("idTransaccion");
  const idGrupoEnergetico = watch("idGrupoEnergetico");
  const idEnergetico = watch("idEnergetico");

  const parsedIdEnergetico = Number(idEnergetico);
  const parsedIdTransaccion = Number(idTransaccion);
  const parsedIdGrupoEnergetico = Number(idGrupoEnergetico);

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
        <input
          id="idEnergetico"
          type="number"
          disabled={!idGrupoEnergetico}
          className="w-full p-2 border border-gray-300 rounded"
          {...register("idEnergetico", {
            required: "El energético es requerido",
          })}
        />
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
            <input
              id="idUnidad"
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("idUnidad", {
                required: "La unidad es requerida",
              })}
            />
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

      {/* País Origen */}
      {showPaisOrigen && (
        <div>
          <label htmlFor="idPaisOrigen" className="text-sm font-bold uppercase">
            País de Origen
          </label>
          <input
            id="idPaisOrigen"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("idPaisOrigen", {
              required: "El país de origen es requerido",
            })}
          />
          {errors.idPaisOrigen && (
            <ErrorMessage>{errors.idPaisOrigen.message}</ErrorMessage>
          )}
        </div>
      )}

      {/* Cantidad Inicial y Final */}
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

      {/* Compra mercado spot */}
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

      {/* Empresa Origen */}
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

      {/* Poder Calorífico */}
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

      {/* Porcentaje Humedad */}
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
