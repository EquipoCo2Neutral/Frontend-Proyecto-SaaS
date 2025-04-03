import { useForm } from "react-hook-form";
import { EquipoLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { Login } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: EquipoLoginForm = {
    correo: "",
    contrasena: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: Login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      const token: string = data.token;
      if (!token) {
        toast.error("No se recibió un token.");
        return;
      }

      const decoded: { rol: string } = jwtDecode(token);

      if (decoded.rol === "adminsaas") {
        localStorage.setItem("token", token);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("No tienes permisos para acceder.");
        localStorage.removeItem("token");
      }
    },
  });

  const handleLogin = (formData: EquipoLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-2xl shadow-lg shadow-gray-300"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Correo</label>

          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            className="w-full p-3  border-gray-300 border"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.correo && (
            <ErrorMessage>{errors.correo.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Contraseña</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("contrasena", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.contrasena && (
            <ErrorMessage>{errors.contrasena.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-green-600 hover:bg-green-700 w-full p-3  text-white font-black  text-xl cursor-pointer "
        />
      </form>
    </>
  );
}
