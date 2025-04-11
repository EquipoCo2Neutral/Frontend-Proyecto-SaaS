import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TenantForm from "@/components/tenants/TenantForm";
import { InquilinoFormData } from "@/types/index";
import { createTenant } from "@/api/TenantAPI";

const CreateTenantView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues: InquilinoFormData = {
    rutInquilino: 0,
    nombreInquilino: "",
    direccionInquilino: "",
    telefonoInquilino: 0,
    correoInquilino: "",
    sectorE: "",
    subSectorE: "",
    estadoInquilino: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createTenant,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inquilinos"] });
      toast.success(data.message);
      navigate("/");
    },
  });

  const handleForm = async (formData: InquilinoFormData) => {
    const formattedData = {
      ...formData,
      rutInquilino: Number(formData.rutInquilino),
      telefonoInquilino: Number(formData.telefonoInquilino),
    };

    mutate(formattedData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form
          action=""
          className="mt-10 bg-orange-300 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <TenantForm register={register} errors={errors} />

          <input
            type="submit"
            value="Asignar Inquilino"
            className="bg-orange-600 hover:bg-orange-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateTenantView;
