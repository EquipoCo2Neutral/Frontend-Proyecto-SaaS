import { VentaElectricidadFormData } from "@/types";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { useUnidadesByEnergetico } from "@/hooks/useUnidad";
import { useRegiones } from "@/hooks/useRegion";
import { useSectores } from "@/hooks/useSectorEconomico";
import { useSubSectores } from "@/hooks/useSectorEconomico";
import { useEffect, useState } from "react";

interface VentaElectricidadProps {
  register: UseFormRegister<VentaElectricidadFormData>;
  errors: FieldErrors<VentaElectricidadFormData>;
  watch: UseFormWatch<VentaElectricidadFormData>;
  setValue: UseFormSetValue<VentaElectricidadFormData>;
}

export default function VentaElectricidadForm({
  register,
  errors,
  watch,
  setValue,
}: VentaElectricidadProps) {
  const { data: unidades = [], isLoading: isLoadingUnidades } =
    useUnidadesByEnergetico(43);

  const idDestinoVenta = watch("idDestinoVenta");
  const idSectorEconomico = watch("idSectorEconomico");
  const mostrarRegiones = idDestinoVenta === "3" || idDestinoVenta === "4";
  const mostrarSectorEconomico =
    idDestinoVenta === "3" || idDestinoVenta === "4";

  const { data: regiones = [] } = useRegiones(mostrarRegiones ? 1 : 0);
  const { data: sectores = [] } = useSectores();
  const { data: subSectores = [] } = useSubSectores(idSectorEconomico ?? 0);

  // Limpiar campos dependientes si cambia el destino de venta
  useEffect(() => {
    setValue("idUnidad", "");
    setValue("ventaMercadoSpot", null);
    setValue("idRegion", null);
    setValue("idSectorEconomico", null);
    setValue("idSubSectorEconomico", null);
  }, [idDestinoVenta, setValue]);

  // Limpiar subSector si cambia el sector
  useEffect(() => {
    setValue("idSubSectorEconomico", null);
  }, [idSectorEconomico, setValue]);

  return (
    <div className="w-full space-y-6">
      {/* Campo Destino de la Venta */}
      <div className="w-full">
        <label htmlFor="idDestinoVenta" className="text-sm font-bold uppercase">
          Destino de la Venta
        </label>
        <select
          id="idDestinoVenta"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("idDestinoVenta", {
            required: "El destino de la venta es requerido",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione un destino de venta
          </option>
          <option value="1">Venta a Generación Eléctrica</option>
          <option value="2">Venta a Distribución Eléctrica</option>
          <option value="3">Venta Regulada</option>
          <option value="4">Venta No Regulada (Clientes libres)</option>
        </select>
        {errors.idDestinoVenta && (
          <ErrorMessage>{errors.idDestinoVenta.message}</ErrorMessage>
        )}
      </div>

      {/* Mostrar checkbox ventaMercadoSpot si destino = 1 */}
      {idDestinoVenta === "1" && (
        <div className="w-full">
          <label className="text-sm font-bold uppercase flex items-center gap-2">
            <input type="checkbox" {...register("ventaMercadoSpot")} />
            Venta en Mercado Spot
          </label>
        </div>
      )}

      {/* Empresa Destino */}
      <div className="w-full">
        <label htmlFor="empresaDestino" className="text-sm font-bold uppercase">
          Empresa Destino
        </label>
        <input
          type="text"
          id="empresaDestino"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("empresaDestino", {
            required: "La empresa destino es requerida",
          })}
        />
        {errors.empresaDestino && (
          <ErrorMessage>{errors.empresaDestino.message}</ErrorMessage>
        )}
      </div>

      {/* Región (si destino = 3 o 4) */}
      {mostrarRegiones && (
        <div className="w-full">
          <label htmlFor="idRegion" className="text-sm font-bold uppercase">
            Región
          </label>
          <select
            id="idRegion"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("idRegion", {
              required: "La región es requerida",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione una región
            </option>
            {regiones.map((region) => (
              <option key={region.idRegion} value={region.idRegion}>
                {region.nombre}
              </option>
            ))}
          </select>
          {errors.idRegion && (
            <ErrorMessage>{errors.idRegion.message}</ErrorMessage>
          )}
        </div>
      )}

      {/* Sector Económico (si destino = 3 o 4) */}
      {mostrarSectorEconomico && (
        <>
          <div className="w-full">
            <label
              htmlFor="idSectorEconomico"
              className="text-sm font-bold uppercase"
            >
              Sector Económico
            </label>
            <select
              id="idSectorEconomico"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("idSectorEconomico", {
                required: "El sector económico es requerido",
              })}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccione un sector económico
              </option>
              {sectores.map((sector) => (
                <option key={sector.idSector} value={sector.idSector}>
                  {sector.nombreSector}
                </option>
              ))}
            </select>
            {errors.idSectorEconomico && (
              <ErrorMessage>{errors.idSectorEconomico.message}</ErrorMessage>
            )}
          </div>

          {/* Subsector económico */}
          <div className="w-full">
            <label
              htmlFor="idSubSectorEconomico"
              className="text-sm font-bold uppercase"
            >
              Subsector Económico
            </label>
            <select
              id="idSubSectorEconomico"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("idSubSectorEconomico", {
                required: "El subsector económico es requerido",
              })}
              defaultValue=""
              disabled={!idSectorEconomico}
            >
              <option value="" disabled>
                {idSectorEconomico
                  ? "Seleccione un subsector"
                  : "Seleccione un sector primero"}
              </option>
              {subSectores.map((sub) => (
                <option key={sub.idSubSector} value={sub.idSubSector}>
                  {sub.nombreSubSector}
                </option>
              ))}
            </select>
            {errors.idSubSectorEconomico && (
              <ErrorMessage>{errors.idSubSectorEconomico.message}</ErrorMessage>
            )}
          </div>
        </>
      )}

      {/* Fila Cantidad Vendida + Unidad */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="cantidadVendida"
            className="text-sm font-bold uppercase"
          >
            Cantidad Vendida
          </label>
          <input
            type="number"
            step="any"
            id="cantidadVendida"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("cantidadVendida", {
              required: "La cantidad vendida es requerida",
              min: {
                value: 0,
                message: "Debe ser un número positivo",
              },
            })}
          />
          {errors.cantidadVendida && (
            <ErrorMessage>{errors.cantidadVendida.message}</ErrorMessage>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <label htmlFor="idUnidad" className="text-sm font-bold uppercase">
            Unidad
          </label>
          <select
            id="idUnidad"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("idUnidad", {
              required: "La unidad es requerida",
            })}
            defaultValue=""
            disabled={isLoadingUnidades}
          >
            <option value="" disabled>
              {isLoadingUnidades
                ? "Cargando unidades..."
                : "Seleccione una unidad"}
            </option>
            {unidades.map((unidad) => (
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
    </div>
  );
}
