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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-16 rounded-3xl shadow-lg relative w-3/5">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl text-gray-500"
        >
          ❌
        </button>
        <EditTenantForm data={data} inquilinoId={inquilinoId} />
      </div>
    </div>
  );
};
export default EditTenantModal;
