import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProcesosFormData } from "types";

type TenantFormProps = {
  register: UseFormRegister<ProcesosFormData>;
  errors: FieldErrors<ProcesosFormData>;
};

export default function TenantForm({ errors, register }: TenantFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="año_proceso" className="text-sm uppercase font-bold">
          año del proceso
        </label>
        <input
          id="año_proceso"
          className="w-full p-3  border border-gray-200"
          type="number"
          placeholder="año del proceso"
          {...register("año_proceso", {
            required: "El año del proceso es obligatorio",
          })}
        />

        {errors.año_proceso && (
          <ErrorMessage>{errors.año_proceso.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
