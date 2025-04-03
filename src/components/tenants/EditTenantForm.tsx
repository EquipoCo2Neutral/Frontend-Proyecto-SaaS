import { Link, useNavigate } from "react-router-dom";
import TenantForm from "./TenantForm";
import { Inquilino, InquilinoFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTenant } from "@/api/TenantAPI";
import { toast } from "react-toastify";

type EditTenantFormProps = {
  data: InquilinoFormData;
  inquilinoId: Inquilino["inquilinoId"];
};

const EditTenantForm = ({ data, inquilinoId }: EditTenantFormProps) => {
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
      navigate("/");
    },
  });

  const handleForm = (formData: InquilinoFormData) => {
    const dataTransform = {
      ...formData,
      rutInquilino: Number(formData.rutInquilino),
      telefonoInquilino: Number(formData.telefonoInquilino),
    };

    const data = {
      formData: dataTransform,
      inquilinoId,
    };
    mutate(data);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Inquilino</h1>
        <p className="text-2xl font-light ">Espacio para editar inquilinos</p>
        <nav className="my-5">
          <Link
            className="bg-green-400 hover:bg-green-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver a Inquilinos
          </Link>
        </nav>

        <form
          action=""
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <TenantForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-gray-600 hover:bg-gray-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default EditTenantForm;
