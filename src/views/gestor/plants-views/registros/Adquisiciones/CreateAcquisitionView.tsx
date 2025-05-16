import { AdquisicionFormData } from "@/types/index";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProcessForm from "@/components/process/ProcessForm";
import { createAcquisition } from "@/api/Registros/AdquisicionesAPI";
import AdquisicionForm from "@/components/register/acquisition/acquisitionForm";

const CreateAcquisitionView = () => {
  const navigate = useNavigate();
  //extraer mesProceso de la URL
  const { idMesProceso } = useParams();
  console.log(idMesProceso);

  const initialValues: AdquisicionFormData = {
    idMesProceso: idMesProceso ?? "",
    idTransaccion: "",
    idGrupoEnergetico: "",
    idEnergetico: "",
    idPaisOrigen: null,
    empresaOrigen: null,
    porcentajeHumedad: null,
    compraMercadoSpot: null,
    idUnidad: "",
    Cantidad: 0,
    cantidadInicial: null,
    cantidadFinal: null,
    poderCalorifico: null,
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
    mutationFn: createAcquisition,

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adquisiciones"] });
      navigate(`/gestor/planta/proceso/mes-proceso/${idMesProceso}`);
    },
  });

  const handleForm = async (formData: AdquisicionFormData) => {
    const formattedData = {
      idMesProceso: idMesProceso ?? "",
      idTransaccion: formData.idTransaccion,
      idGrupoEnergetico: formData.idGrupoEnergetico,
      idEnergetico: formData.idEnergetico,
      idPaisOrigen:
        formData.idPaisOrigen !== null ? Number(formData.idPaisOrigen) : null,
      empresaOrigen: formData.empresaOrigen ?? null,
      porcentajeHumedad:
        formData.porcentajeHumedad !== null
          ? Number(formData.porcentajeHumedad)
          : null,
      compraMercadoSpot: formData.compraMercadoSpot ?? null,
      idUnidad: formData.idUnidad,
      Cantidad: Number(formData.Cantidad),
      cantidadInicial:
        formData.cantidadInicial !== null
          ? Number(formData.cantidadInicial)
          : null,
      cantidadFinal:
        formData.cantidadFinal !== null ? Number(formData.cantidadFinal) : null,
      poderCalorifico:
        formData.poderCalorifico !== null
          ? Number(formData.poderCalorifico)
          : null,
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
          <AdquisicionForm
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <input
            type="submit"
            value="Registrar Adquisicion"
            className="bg-purple-600 hover:bg-purple-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateAcquisitionView;
