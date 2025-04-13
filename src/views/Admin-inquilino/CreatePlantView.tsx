import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { InquilinoFormData, PlantaRegisterForm } from "@/types/index";
import { createTenant } from "@/api/TenantAPI";
import PlantForm from "@/components/plants/PlantForm";
import { createPlantsByTenant } from "@/api/PlantasAPI";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  inquilinoId: string;
}
const CreatePlantView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues: PlantaRegisterForm = {
    nombre: "",
    direccion: "",
    estado: true,
    usuarioId: "",
    inquilinoId: "",
    comunaId: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createPlantsByTenant,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["plantas"] });
      toast.success(data.message);
      reset();
      navigate("/plants");
    },
  });

  const handleForm = async (formData: PlantaRegisterForm) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    let inquilinoIdToken = "";
    try {
      const decodedToken: any = await jwtDecode(token);
      inquilinoIdToken = decodedToken.inquilinoId;
    } catch (error) {
      console.error("Error al decodificar token:", error);
      return;
    }
    const formattedData = {
      ...formData,
      estado: true,
      inquilinoId: inquilinoIdToken,
      comunaId: Number(formData.comunaId),
    };

    mutate(formattedData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form
          action=""
          className="mt-10 bg-green-300 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <PlantForm register={register} errors={errors} />

          <input
            type="submit"
            value="Asignar Planta"
            className="bg-green-600 hover:bg-green-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreatePlantView;
