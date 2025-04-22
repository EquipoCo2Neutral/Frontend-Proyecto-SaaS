import { useForm } from "react-hook-form";
import { UsersLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { Login, LoginUsers } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginUsersView() {
  const navigate = useNavigate();
  const initialValues: UsersLoginForm = {
    correoUsuario: "",
    contrasenaUsuario: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: LoginUsers,
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

      if (decoded.rol === "admininquilino") {
        localStorage.setItem("token", token);
        toast.success("inicio de sesión exitoso");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        if (decoded.rol === "gestorenergético") {
          localStorage.setItem("token", token);
          toast.success("inicio de sesión exitoso");
          setTimeout(() => {
            navigate("/gestor/home");
          }, 2000);
        } else {
          toast.error("No tienes permisos para acceder.");
          localStorage.removeItem("token");
        }
      }
    },
  });

  const handleLogin = (formData: UsersLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-5xl font-black text-black text-center">Login</h1>
      <p className="text-2xl font-light text-black mt-5 text-center mb-4">
        Llena el formulario para{" "}
        <span className="text-orange-500 font-bold">Iniciar sesión</span>
      </p>
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
            {...register("correoUsuario", {
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.correoUsuario && (
            <ErrorMessage>{errors.correoUsuario.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Contraseña</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("contrasenaUsuario", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.contrasenaUsuario && (
            <ErrorMessage>{errors.contrasenaUsuario.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-green-600 hover:bg-green-700 w-full p-3  text-white font-black  text-xl cursor-pointer "
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-500 hover:text-green-600"
          to="/auth/forgot-password"
        >
          ¿Olvidaste tu contraseña? Recupera tu cuenta
        </Link>
      </nav>
    </>
  );
}
