import { UsersRegisterForm, AuthUsers } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createManager(formData: UsersRegisterForm) {
  try {
    const { data } = await api.post<AuthUsers>("/auth/register", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function createTokenConfirmation(formData: UsersRegisterForm) {
  try {
    const { data } = await api.post("/token/confirm", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
