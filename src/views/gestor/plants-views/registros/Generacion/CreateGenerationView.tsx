import { createGeneration } from "@/api/Registros/GeneracionAPI";
import { GeneracionFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import GenerationForm from "@/components/register/generationForm";

const CreateGeneracionView = () => {
  const navigate = useNavigate();
  const { idMesProceso } = useParams();

  const initialValues: GeneracionFormData = {
    idMesProceso: idMesProceso ?? "",
    idTecnologia: "",
    idUnidad_CGB: "",
    idUnidad_Ci: "",
    cantidadGeneradaBruta: 0,
    capacidadInstalada: 0,
    idUnidad_Cena: null,
    idUnidad_Ce: null,
    idEnergetico: null,
    consumoEnergetico: null,
    cantidadEnergiaNoAprovechada: null,
    Observaciones: null,
    Tipo: null,
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
    mutationFn: createGeneration,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["generacion"] });
      navigate(`/gestor/planta/proceso/mes-proceso/${idMesProceso}`);
    },
  });

  const handleForm = async (formData: GeneracionFormData) => {
    const formattedData = {
      idMesProceso: idMesProceso ?? "",
      idTecnologia: formData.idTecnologia,
      idUnidad_CGB: formData.idUnidad_CGB,
      idUnidad_Ci: formData.idUnidad_Ci,
      cantidadGeneradaBruta: Number(formData.cantidadGeneradaBruta),
      capacidadInstalada: Number(formData.capacidadInstalada),
      idUnidad_Cena:
        formData.idUnidad_Cena !== null ? Number(formData.idUnidad_Cena) : null,
      idUnidad_Ce:
        formData.idUnidad_Ce !== null ? Number(formData.idUnidad_Ce) : null,
      idEnergetico:
        formData.idEnergetico !== null ? Number(formData.idEnergetico) : null,
      consumoEnergetico:
        formData.consumoEnergetico !== null
          ? Number(formData.consumoEnergetico)
          : null,
      cantidadEnergiaNoAprovechada:
        formData.cantidadEnergiaNoAprovechada !== null
          ? Number(formData.cantidadEnergiaNoAprovechada)
          : null,
      Observaciones:
        formData.Observaciones !== null ? formData.Observaciones : null,
      Tipo: formData.Tipo !== null ? formData.Tipo : null,
    };
    mutate(formattedData);
  };
  //mutacion para registrar adquisicion

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form
          action=""
          className="mt-10 bg-purple-300 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <GenerationForm
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          <input
            type="submit"
            value="Registrar Generación"
            className="mt-8 w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm uppercase rounded-2xl px-4 py-3 shadow-md cursor-pointer transition-all duration-300"
          />
        </form>
      </div>
    </>
  );
};

export default CreateGeneracionView;
