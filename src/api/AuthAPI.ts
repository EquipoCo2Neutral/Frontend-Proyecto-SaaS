import {
  EquipoLoginForm,
  UsersLoginForm,
  UsersRegisterForm,
  UsersInviteForm,
  RequestConfirmationCodeForm,
  ForgotPasswordForm,
  ConfirmToken,
  NewPasswordForm,
} from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function Login(formData: EquipoLoginForm) {
  try {
    const { data } = await api.post("/auth/login-equipo", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function LoginUsers(formData: UsersLoginForm) {
  try {
    const { data } = await api.post("/auth/login", formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function RegisterUsers(formData: UsersRegisterForm) {
  try {
    const { data } = await api.post("/auth/register", formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function InviteUsers(formData: UsersInviteForm) {
  try {
    const { data } = await api.post("/auth/invitation", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function ValidateInvitation(token: string) {
  try {
    const { data } = await api(`/auth/validate-invitation?token=${token}`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export async function ConfirmAccount(token: string) {
  try {
    const { data } = await api.post<string>(`/token/confirm`, token);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function requestConfirmationCode(
  formData: RequestConfirmationCodeForm
) {
  try {
    const { data } = await api.post(`/auth/request-code`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post("/auth/forgot-password", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function validateToken(formData: ConfirmToken) {
  try {
    const { data } = await api.post("/auth/validate-token", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const { data } = await api.post(`/auth/update-password/${token}`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
