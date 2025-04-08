import TenantInfo from "@/components/tenants/TenantInfo";
import { getTenantById} from "@/api/TenantAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Inquilino} from "@/types/index";

export default function InfoTenantView(){

    const params = useParams();

    const inquilinoId = params.inquilinoId!;
  
    const { data, isLoading, error } = useQuery<Inquilino>({
      queryKey: ["editTenant", inquilinoId],
      queryFn: () => getTenantById(inquilinoId),
      retry: 1,
    });
    // Verifica si los datos están siendo cargados
    if (isLoading) {
        return <div>Cargando...</div>;
      }
    
      // Verifica si ocurrió un error
    if (error) {
        return <div>Error al cargar los datos</div>;
      }
    
      // Verifica si los datos no existen
    if (!data) {
        return <div>No se encontraron datos</div>;
      }
    
    console.log(data);

    return<>

    <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">{data.nombreInquilino}</h1>

        <nav className="my-5">
          <Link
            className="bg-green-400 hover:bg-green-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver a Inquilinos
          </Link>

        </nav>

        <TenantInfo inquilinos={[data]} />

      </div>
        
    
    </>
}