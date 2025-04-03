import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTenantById, getTenants } from "@/api/TenantAPI";
import EditTenantForm from "@/components/tenants/EditTenantForm";

const EditTenantView = () => {
  const params = useParams();

  const inquilinoId = params.inquilinoId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editTenant", inquilinoId],
    queryFn: () => getTenantById(inquilinoId),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditTenantForm data={data} inquilinoId={inquilinoId} />;
};

export default EditTenantView;
