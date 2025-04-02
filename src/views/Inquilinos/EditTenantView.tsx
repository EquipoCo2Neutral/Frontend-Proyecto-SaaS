import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTenantById, getTenants } from "@/api/TenantAPI";
import { error } from "console";

const EditTenantView = () => {
  const params = useParams();

  const inquilinoId = params.inquilinoId!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["editTenant", inquilinoId],
    queryFn: () => getTenantById(inquilinoId),
    retry: 1,
  });

  console.log(data);

  return <div>EditTenantView</div>;
};

export default EditTenantView;
