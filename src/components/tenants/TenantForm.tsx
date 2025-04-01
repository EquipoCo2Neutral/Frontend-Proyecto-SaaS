import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { InquilinoFormData } from "types";

type TenantFormProps = {
  register: UseFormRegister<InquilinoFormData>;
  errors: FieldErrors<InquilinoFormData>;
};

export default function TenantForm({ errors, register }: TenantFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="rutInquilino" className="text-sm uppercase font-bold">
          Rut del Inquilino
        </label>
        <input
          id="rutInquilino"
          className="w-full p-3  border border-gray-200"
          type="number"
          placeholder="Rut del inquilino"
          {...register("rutInquilino", {
            required: "El rut del inquilino es obligatorio",
          })}
        />

        {errors.rutInquilino && (
          <ErrorMessage>{errors.rutInquilino.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="nombreInquilino"
          className="text-sm uppercase font-bold"
        >
          Nombre del Inquilino
        </label>
        <input
          id="nombreInquilino"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Inquilino"
          {...register("nombreInquilino", {
            required: "El nombre del inquilino es obligatorio",
          })}
        />

        {errors.nombreInquilino && (
          <ErrorMessage>{errors.nombreInquilino.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="direccionInquilino"
          className="text-sm uppercase font-bold"
        >
          Dirección Inquilino
        </label>
        <input
          id="direccionInquilino"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Dirección del Inquilino"
          {...register("direccionInquilino", {
            required: "La dirección es obligatoria",
          })}
        />

        {errors.direccionInquilino && (
          <ErrorMessage>{errors.direccionInquilino.message}</ErrorMessage>
        )}
      </div>
      <div className="mb-5 space-y-3">
        <label
          htmlFor="telefonoInquilino"
          className="text-sm uppercase font-bold"
        >
          Teléfono del Inquilino
        </label>
        <input
          id="telefonoInquilino"
          className="w-full p-3  border border-gray-200"
          type="tel"
          placeholder="Teléfono del Inquilino"
          {...register("telefonoInquilino", {
            required: "El teléfono del inquilino es obligatorio",
          })}
        />

        {errors.telefonoInquilino && (
          <ErrorMessage>{errors.telefonoInquilino.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="correoInquilino"
          className="text-sm uppercase font-bold"
        >
          Correo del Inquilino
        </label>
        <input
          id="correoInquilino"
          className="w-full p-3  border border-gray-200"
          type="email"
          placeholder="Correo del Inquilino"
          {...register("correoInquilino", {
            required: "El Correo del inquilino es obligatorio",
          })}
        />

        {errors.correoInquilino && (
          <ErrorMessage>{errors.correoInquilino.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="sectorE" className="text-sm uppercase font-bold">
          Sector del Inquilino
        </label>
        <input
          id="sectorE"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Sector del Inquilino"
          {...register("sectorE", {
            required: "El Sector del inquilino es obligatorio",
          })}
        />

        {errors.sectorE && (
          <ErrorMessage>{errors.sectorE.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="subSectorE" className="text-sm uppercase font-bold">
          Sub-Sector del Inquilino
        </label>
        <input
          id="subSectorE"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Sub-Sector del Inquilino"
          {...register("subSectorE", {
            required: "El Sub-Sector del inquilino es obligatorio",
          })}
        />

        {errors.subSectorE && (
          <ErrorMessage>{errors.subSectorE.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
