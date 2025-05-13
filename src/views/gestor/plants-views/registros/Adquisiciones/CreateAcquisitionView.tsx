import { AdquisicionFormData } from "@/types/index";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProcessForm from "@/components/process/ProcessForm";
import { createAcquisition } from "@/api/Registros/AdquisicionesAPI";

const CreateAcquisitionView = () => {
  //extraer mesProceso de la URL
  const { idMesProceso } = useParams();
  console.log(idMesProceso);

  const initialValues: AdquisicionFormData = {
    idMesProceso: "",
    idTransaccion: 0,
    idGrupoEnergetico: 0,
    idEnergetico: 0,
    idPaisOrigen: null,
    empresaOrigen: null,
    porcentajeHumedad: null,
    compraMercadoSpot: null,
    idUnidad: 0,
    Cantidad: 0,
    cantidadInicial: null,
    cantidadFinal: null,
    poderCalorifico: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAcquisition,
  });

  const handleForm = "1";
  //mutacion para registrar adquisicion

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form
          action=""
          className="mt-10 bg-orange-300 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProcessForm register={register} errors={errors} />

          <input
            type="submit"
            value="Agregar Proceso"
            className="bg-orange-600 hover:bg-orange-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateAcquisitionView;
