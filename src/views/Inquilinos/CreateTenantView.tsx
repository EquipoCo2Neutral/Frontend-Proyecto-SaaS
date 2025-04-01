import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TenantForm from "@/components/tenants/TenantForm";
import { InquilinoFormData } from "@/types/index";
import { createTenant } from "@/api/TenantAPI";

const CreateTenantView = () => {
  const navigate = useNavigate();
  const initialValues: InquilinoFormData = {
    rutInquilino: 0,
    nombreInquilino: "",
    direccionInquilino: "",
    telefonoInquilino: 0,
    correoInquilino: "",
    sectorE: "",
    subSectorE: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForm = async (formData: InquilinoFormData) => {
    const data = await createTenant({
      ...formData,
      rutInquilino: Number(formData.rutInquilino),
      telefonoInquilino: Number(formData.telefonoInquilino),
    });

    toast.success(data.message);
    navigate("/");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Agregar Inquilino</h1>
        <p className="text-2xl font-light ">
          Espacio para agregar nuevos inquilinos
        </p>
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
            value="Asignar Inquilino"
            className="bg-gray-600 hover:bg-gray-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateTenantView;
