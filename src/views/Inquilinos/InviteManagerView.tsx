import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { UsersInviteForm } from "@/types/index";

import InviteManagerForm from "@/components/managers/InviteManagerForm";
import { InviteUsers } from "@/api/AuthAPI";
import { jwtDecode } from "jwt-decode";

const InviteManagerView = () => {
  const navigate = useNavigate();

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
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/home");
    },
  });

  const handleForm = async (formData: UsersInviteForm) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    let inquilinoIdToken = "";
    try {
      const decodedToken: any = await jwtDecode(token);
      inquilinoIdToken = decodedToken.inquilinoId;
    } catch (error) {
      console.error("Error al decodificar token:", error);
      return;
    }
    const formattedData = {
      ...formData,
      rolId: Number(3),
      inquilinoId: inquilinoIdToken,
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
          <InviteManagerForm register={register} errors={errors} />

          <input
            type="submit"
            value="Asignar Gestor"
            className="bg-orange-600 hover:bg-orange-800 w-full text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default InviteManagerView;
