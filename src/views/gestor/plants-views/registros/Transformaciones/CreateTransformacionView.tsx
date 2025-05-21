import { createTransformacion } from "@/api/Registros/TransformacionesAPI";
import TransformationForm from "@/components/register/transformation/transformationForm";
import { TransformacionFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTransformacionView = () => {
  const navigate = useNavigate();
  const { idMesProceso } = useParams();

  const initialValues: TransformacionFormData = {
    idMesProceso: idMesProceso ?? "",
    idEnergetico: "",
    cantidad: 0,
    idUnidad: "",
    idEnergeticoProducido: "",
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
    mutationFn: createTransformacion,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["transformacion"] });
      navigate(`/gestor/planta/proceso/mes-proceso/${idMesProceso}`);
    },
  });

  const handleForm = async (formData: TransformacionFormData) => {
    const formattedData = {
      idMesProceso: idMesProceso ?? "",
      idEnergetico: Number(formData.idEnergetico),
      cantidad: Number(formData.cantidad),
      idUnidad: Number(formData.idUnidad),
      idEnergeticoProducido: Number(formData.idEnergeticoProducido),
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
          <TransformationForm
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          <input
            type="submit"
            value="Registrar Transformacion"
            className="mt-8 w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm uppercase rounded-2xl px-4 py-3 shadow-md cursor-pointer transition-all duration-300"
          />
        </form>
      </div>
    </>
  );
};

export default CreateTransformacionView;
