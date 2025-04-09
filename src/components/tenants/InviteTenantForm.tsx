import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { UsersInviteForm } from "types";
import { useParams } from "react-router-dom";

type TenantFormProps = {
  register: UseFormRegister<UsersInviteForm>;
  errors: FieldErrors<UsersInviteForm>;
};

export default function InviteTenatForm({ errors, register }: TenantFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="nombreAdmin" className="text-sm uppercase font-bold">
          Nombre del Administrador
        </label>
        <input
          id="nombreAdmin"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Administrador"
          {...register("nombre", {
            required: "El nombre del Administrador es obligatorio",
          })}
        />

        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="correoUsuario" className="text-sm uppercase font-bold">
          Correo del Administrador
        </label>
        <input
          id="correoUsuario"
          className="w-full p-3  border border-gray-200"
          type="email"
          placeholder="Correo del Administrador"
          {...register("correoUsuario", {
            required: "El Correo del administrador es obligatorio",
          })}
        />

        {errors.correoUsuario && (
          <ErrorMessage>{errors.correoUsuario.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
