import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProcessForm from "@/components/process/ProcessForm";
import { ProcesosFormData } from "@/types/index";

import { createProcess } from "@/api/ProcesosAPI";

const CreateTenantView = () => {
  const { plantaId } = useParams();
  console.log(plantaId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues: ProcesosFormData = {
    año_proceso: 2020,
    idPlanta: plantaId ?? "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProcess,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["procesos"] });
      toast.success(data.message);
      navigate(`/gestor/planta/${plantaId}`);
    },
  });

  const handleForm = async (formData: ProcesosFormData) => {
    const formattedData = {
      año_proceso: Number(formData.año_proceso),
      idPlanta: plantaId ?? "",
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

export default CreateTenantView;
