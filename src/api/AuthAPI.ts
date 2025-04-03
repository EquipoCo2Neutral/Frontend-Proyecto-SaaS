import { EquipoLoginForm } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function Login(formData: EquipoLoginForm) {
  try {
    const { data } = await api.post("/auth/login-equipo", formData);
    console.log(data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
