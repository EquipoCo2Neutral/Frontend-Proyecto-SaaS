import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ConfirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const { mutate } = useMutation({
    mutationFn: ConfirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      toast.success(data);
      // Redirigir a la página de login tras dos segundos con navigate
      setTimeout(() => {
        navigate("/auth/login-users");
      }, 2000);
    },
  });

  const handleChange = (token: string) => {
    setToken(token);
  };
  const handleComplete = (token: string) => {
    mutate(token);
  };
  return (
    <>
      <h1 className="text-5xl font-black text-black">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-black mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-orange-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block text-black">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-800 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
