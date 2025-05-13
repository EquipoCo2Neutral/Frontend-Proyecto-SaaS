import { AdquisicionFormData } from "@/types/index";
import { useParams } from "react-router-dom";

const CreateAcquisitionView = () => {
  //extraer mesProceso de la URL
  const { idMesProceso } = useParams();
  console.log(idMesProceso);

  const initialValues: AdquisicionFormData = {
    idMesProceso: "",
    idTransaccion: 0,
    idGrupoEnergetico: 0,
    idEnergetico: 0,
    idPaisOrigen: 0,
    empresaOrigen: "",
    porcentajeHumedad: 0,
    compraMercadoSpot: false,
    idUnidad: 0,
    Cantidad: 0,
    cantidadInicial: 0,
    cantidadFinal: 0,
    poderCalorifico: 0,
  };

  return <div>CreateAcquisitionView</div>;
};

export default CreateAcquisitionView;
