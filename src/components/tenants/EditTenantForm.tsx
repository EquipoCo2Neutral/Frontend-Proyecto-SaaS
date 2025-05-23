import { Link, useNavigate } from "react-router-dom";
import TenantForm from "./TenantForm";
import { Inquilino, InquilinoFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTenant } from "@/api/TenantAPI";
import { toast } from "react-toastify";

type EditTenantFormProps = {
  suscripcion: number;
  data: InquilinoFormData;
  inquilinoId: Inquilino["inquilinoId"];
  onSuccess?: () => void; 
};

const EditTenantForm = ({ suscripcion, data, inquilinoId, onSuccess }: EditTenantFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rutInquilino: data.rutInquilino,
      nombreInquilino: data.nombreInquilino,
      direccionInquilino: data.direccionInquilino,
      telefonoInquilino: data.telefonoInquilino,
      correoInquilino: data.correoInquilino,
      sectorE: data.sectorE,
      subSectorE: data.subSectorE,
      estadoInquilino: data.estadoInquilino,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTenant,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inquilinos"] });
      queryClient.invalidateQueries({ queryKey: ["editTenant", inquilinoId] });
      toast.success(data.message);
      if (onSuccess) onSuccess(); // <-- aquí se cierra el modal
      else navigate("/"); // fallback si no se usa desde modal
    },
  });

  const handleForm = (formData: InquilinoFormData) => {
    const dataTransform = {
      ...formData,
      rutInquilino: Number(formData.rutInquilino),
      telefonoInquilino: Number(formData.telefonoInquilino),
      estadoInquilino: formData.estadoInquilino,
      suscripcionId: Number(suscripcion),
    };

    const data = {
      formData: dataTransform,
      inquilinoId,
    };
    mutate(data);
    console.log("Update",data)
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-black text-4xl  my-5">Editar Inquilino</h1>
        <p className="text-xl font-bold ">Espacio para editar inquilinos</p>

        <form
          action=""
          className="mt-10 bg-orange-300 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <TenantForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-orange-600 hover:bg-orange-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default EditTenantForm;
