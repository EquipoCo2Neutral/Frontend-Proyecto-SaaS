import { getTenantById } from "@/api/TenantAPI";
import EditTenantForm from "@/components/tenants/EditTenantForm";
import { useQuery } from "@tanstack/react-query";

interface EditTenantModalProps {
  inquilinoId: string;
  onClose: () => void;
}

const EditTenantModal: React.FC<EditTenantModalProps> = ({
  inquilinoId,
  onClose,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["editTenant", inquilinoId],
    queryFn: () => getTenantById(inquilinoId),
  });

  if (isLoading) return null;
  
  return (
    
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto">
      <div  className="flex min-h-screen items-center justify-center p-4">
        <div  className="bg-white p-6 md:p-10 rounded-3xl shadow-lg relative w-full max-w-3xl mx-4 my-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-3xl text-gray-500"
          >
            ❌
          </button>
          <EditTenantForm data={data} inquilinoId={inquilinoId} onSuccess={onClose} />
        </div>
      </div>      
    </div>

  );
};
export default EditTenantModal;
