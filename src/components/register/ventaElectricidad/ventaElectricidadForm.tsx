import { VentaElectricidadFormData } from "@/types";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { useUnidadesByEnergetico } from "@/hooks/useUnidad";
import { useEffect } from "react";

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
  const { data: unidades = [], isLoading } = useUnidadesByEnergetico(43);

  const idDestinoVenta = watch("idDestinoVenta");

  // Limpiar campos dependientes si cambia el destino de venta
  useEffect(() => {
    setValue("idUnidad", "");
    setValue("ventaMercadoSpot", null);
  }, [idDestinoVenta, setValue]);

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

      {/* Mostrar campo ventaMercadoSpot si idDestinoVenta === "1" */}
      {idDestinoVenta === "1" && (
        <div className="w-full">
          <label className="text-sm font-bold uppercase flex items-center gap-2">
            <input type="checkbox" {...register("ventaMercadoSpot")} />
            Venta en Mercado Spot
          </label>
        </div>
      )}

      {/* Campo Empresa Destino */}
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

      {/* Fila: Cantidad Vendida + Unidad */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        {/* Campo Cantidad Vendida */}
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

        {/* Campo Unidad */}
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
            disabled={isLoading}
          >
            <option value="" disabled>
              {isLoading ? "Cargando unidades..." : "Seleccione una unidad"}
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
