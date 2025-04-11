
import InfoGestores from "./Admin-inquilino/InfoGestorView";
import { useQuery } from "@tanstack/react-query";
import { getTenantById } from "@/api/TenantAPI";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  inquilinoId: string;
}

const HomeView = () => {
    // Obtener y decodificar el token
    const token = localStorage.getItem("token");
    let inquilinoId: string | null = null;
  
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        inquilinoId = decoded.inquilinoId;
        console.log("ID del inquilino decodificado:", inquilinoId);
      } catch (e) {
        console.error("Error al decodificar el token", e);
      }
    }
    const {
      data,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["editTenant", inquilinoId],
      queryFn: () => getTenantById(inquilinoId!),
      enabled: !!inquilinoId, // solo ejecuta si hay un inquilinoId válido
      retry: 1,
    });
  
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los datos</div>;
    if (!data) return <div>No se encontraron datos</div>;
  return (
    <>
      <div className="">
        <InfoGestores inquilinos={[data]} />
      </div>

      
    </>
  );
};

export default HomeView;
