import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Persona, UsersRegisterForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ValidateInvitation } from "@/api/AuthAPI";
import { createManager } from "@/api/ManagerAPI";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { createPersona } from "@/api/PersonasAPI";

export default function RegisterUsersView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { data } = useQuery({
    queryKey: ["validation-token", token],
    queryFn: ({ queryKey }) => {
      const [, token] = queryKey;
      return ValidateInvitation(token as string);
    },
    enabled: !!token,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UsersRegisterForm & { password_confirmation: string }>();

  const password = watch("contrasenaUsuario");

  useEffect(() => {
    if (data) {
      reset({
        inquilinoId: data.inquilinoId,
        correoUsuario: data.correoUsuario,
        contrasenaUsuario: "",
        rolId: data.rolId,
      });
    }
  }, [data, reset]);

  const { mutate } = useMutation({
    mutationFn: createManager,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      try {
        const usuarioId = data?.usuarioId;
        const res2 = await api.post("/token", { usuarioId });
        const { token } = res2.data;
        const { correoUsuario } = res2.data.usuario;

        if(usuarioId){
          const personaData = {
            nombre: watch("nombre"),
            rut: watch("rut"),
            primerApellido: watch("primerApellido"),
            segundoApellido: watch("segundoApellido"),
            telefono: watch("telefono"),
            usuarioId: usuarioId,
          };
          persona(personaData);
          
        }
        console.log("datasa",data)
        console.log("usuarioId?",usuarioId);
        console.log("data?", res2);
        await api.post("send/confirmation", { token, correoUsuario });
      } catch (error) {
        Error("Error en el token.");
      }
    },

  });

  const { mutate: persona } = useMutation({
    mutationFn: createPersona,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      toast.success(
        "Usuario creado correctamente, Revisa tu correo para activar tu cuenta"
      );
      setTimeout(() => {
        navigate("/auth/login-users");
      }, 2000);
    },
  });

  const handleRegister = (
    formData: UsersRegisterForm & { password_confirmation: string }
  ) => {
    const { password_confirmation, ...dataToSend } = formData;
    mutate(dataToSend);
    // petición a la API para registrar al usuario
  };

  return (
    <>
      <h1 className="text-5xl font-black text-black text-center">
        Has sido invitado
      </h1>
      <p className="text-2xl font-light text-black mt-5">
        Llena el formulario para{" "}
        <span className="text-orange-500 font-bold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-white mt-10 rounded-lg shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            disabled
            className="w-full p-3 border-gray-300 border"
            {...register("correoUsuario", {
              required: "El Email de registro es obligatorio",
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
          <label className="font-normal text-2xl">Password</label>
          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("contrasenaUsuario", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.contrasenaUsuario && (
            <ErrorMessage>{errors.contrasenaUsuario.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repetir Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>
                {/* RUT */}
                <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">RUT</label>
          <input
            type="number"
            placeholder="Ej: 12345678"
            className="w-full p-3 border-gray-300 border"
            {...register("rut", {
              required: "El RUT es obligatorio",
              valueAsNumber: true,
            })}
          />
          {errors.rut && <ErrorMessage>{errors.rut.message}</ErrorMessage>}
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 border-gray-300 border"
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
        </div>

        {/* Primer Apellido */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Primer Apellido</label>
          <input
            type="text"
            placeholder="Primer Apellido"
            className="w-full p-3 border-gray-300 border"
            {...register("primerApellido", {
              required: "El primer apellido es obligatorio",
            })}
          />
          {errors.primerApellido && (
            <ErrorMessage>{errors.primerApellido.message}</ErrorMessage>
          )}
        </div>

        {/* Segundo Apellido */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Segundo Apellido</label>
          <input
            type="text"
            placeholder="Segundo Apellido"
            className="w-full p-3 border-gray-300 border"
            {...register("segundoApellido", {
              required: "El segundo apellido es obligatorio",
            })}
          />
          {errors.segundoApellido && (
            <ErrorMessage>{errors.segundoApellido.message}</ErrorMessage>
          )}
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Teléfono</label>
          <input
            type="number"
            placeholder="Ej: 912345678"
            className="w-full p-3 border-gray-300 border"
            {...register("telefono", {
              required: "El número de teléfono es obligatorio",
              valueAsNumber: true,
            })}
          />
          {errors.telefono && (
            <ErrorMessage>{errors.telefono.message}</ErrorMessage>
          )}
        </div>
        <input
          type="submit"
          value="Registrarme"
          className="bg-orange-600 hover:bg-orange-700 w-full p-3 text-white font-black text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
