import { createUF } from "@/api/Registros/UsosFinalesAPI";
import { UFFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UsoFinalForm from "@/components/register/usoFinal/usoFinalForm";

const CreateUFView = () => {
  const navigate = useNavigate();
  const { idMesProceso } = useParams();

  const initialValues: UFFormData = {
    idMesProceso: idMesProceso ?? "",
    idEnergetico: "",
    idCategoriaUF: "",
    idTipoUF: null,
    idUnidad: "",
    cantidad: 0,
    tipo: null,
    detalle: null,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createUF,

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["usoFinal"] });
      navigate(`/gestor/planta/proceso/mes-proceso/${idMesProceso}`);
    },
  });

  const handleForm = async (formData: UFFormData) => {
    const formattedData = {
      idMesProceso: idMesProceso ?? "",
      idEnergetico: Number(formData.idEnergetico),
      idCategoriaUF: Number(formData.idCategoriaUF),
      idTipoUF: formData.idTipoUF !== null ? Number(formData.idTipoUF) : null,
      idUnidad: Number(formData.idUnidad),
      cantidad: Number(formData.cantidad),
      tipo: formData.tipo !== null ? formData.tipo : null,
      detalle: formData.detalle !== null ? formData.detalle : null,
    };
    mutate(formattedData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form
          action=""
          className="mt-10 bg-purple-300 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <UsoFinalForm
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <input
            type="submit"
            value="Registrar Uso Final"
            className="mt-8 w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm uppercase rounded-2xl px-4 py-3 shadow-md cursor-pointer transition-all duration-300"
          />
        </form>
      </div>
    </>
  );
};

export default CreateUFView;
