import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { UsersInviteForm } from "types";

type ManagerFormProps = {
  register: UseFormRegister<UsersInviteForm>;
  errors: FieldErrors<UsersInviteForm>;
};

export default function InviteManagerForm({
  errors,
  register,
}: ManagerFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="nombreGestor" className="text-sm uppercase font-bold">
          Nombre del gestor
        </label>
        <input
          id="nombreGestor"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Gestor"
          {...register("nombre", {
            required: "El nombre del Gestor es obligatorio",
          })}
        />

        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="correoUsuario" className="text-sm uppercase font-bold">
          Correo del Gestor
        </label>
        <input
          id="correoUsuario"
          className="w-full p-3  border border-gray-200"
          type="email"
          placeholder="Correo del Usuario"
          {...register("correoUsuario", {
            required: "El Correo del usuario es obligatorio",
          })}
        />

        {errors.correoUsuario && (
          <ErrorMessage>{errors.correoUsuario.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
