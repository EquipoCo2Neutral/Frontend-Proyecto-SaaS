import { createVentaElectricidad } from "@/api/Registros/VentaElectricidadAPI";
import VentaElectricidadForm from "@/components/register/ventaElectricidad/ventaElectricidadForm";
import { VentaElectricidadFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateVentaElectricidadView = () => {
  const navigate = useNavigate();
  const { idMesProceso } = useParams();
  const initialValues: VentaElectricidadFormData = {
    idMesProceso: idMesProceso ?? "",
    idDestinoVenta: "",
    ventaMercadoSpot: null,
    empresaDestino: "",
    idRegion: null,
    idSectorEconomico: null,
    idSubSectorEconomico: null,
    cantidadVendida: 0,
    idUnidad: "",
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
    mutationFn: createVentaElectricidad,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["ventaElectricidad"] });
      navigate(`/gestor/planta/proceso/mes-proceso/${idMesProceso}`);
    },
  });

  const handleForm = async (formData: VentaElectricidadFormData) => {
    const formattedData = {
      idMesProceso: idMesProceso ?? "",
      idDestinoVenta: Number(formData.idDestinoVenta),
      ventaMercadoSpot:
        formData.ventaMercadoSpot !== null ? formData.ventaMercadoSpot : null,
      empresaDestino: formData.empresaDestino,
      idRegion: formData.idRegion !== null ? Number(formData.idRegion) : null,
      idSectorEconomico:
        formData.idSectorEconomico !== null
          ? Number(formData.idSectorEconomico)
          : null,
      idSubSectorEconomico:
        formData.idSubSectorEconomico !== null
          ? Number(formData.idSubSectorEconomico)
          : null,
      cantidadVendida: Number(formData.cantidadVendida),
      idUnidad: Number(formData.idUnidad),
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
          <VentaElectricidadForm
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          <input
            type="submit"
            value="Registrar Venta Electricidad"
            className="mt-8 w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm uppercase rounded-2xl px-4 py-3 shadow-md cursor-pointer transition-all duration-300"
          />
        </form>
      </div>
    </>
  );
};

export default CreateVentaElectricidadView;
