import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { UsersInviteForm } from "@/types/index";

import { InviteUsers } from "@/api/AuthAPI";

import InviteTenatForm from "@/components/tenants/InviteTenantForm";

const InviteTenatView = () => {
  const navigate = useNavigate();
  const { inquilinoId } = useParams();

  const initialValues: UsersInviteForm = {
    nombre: "",
    inquilinoId: "",
    correoUsuario: "",
    rolId: 0,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: InviteUsers,
    onError: (error) => {
      console.log("error");
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log("exito");
      toast.success(data.message);
      navigate("/");
    },
  });

  const handleForm = async (formData: UsersInviteForm) => {
    const formattedData = {
      ...formData,
      inquilinoId: inquilinoId!,
      rolId: Number(2),
    };
    console.log("Formulario enviado con datos:", formattedData); //
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
          <InviteTenatForm register={register} errors={errors} />

          <input
            type="submit"
            value="Asignar Administrador"
            className="bg-orange-600 hover:bg-orange-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default InviteTenatView;
