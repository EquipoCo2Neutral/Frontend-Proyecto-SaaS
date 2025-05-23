import {
  dashboardTenantsSchema,
  Inquilino,
  InquilinoFormData,
} from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createTenant(formData: InquilinoFormData) {
  try {
    const { data } = await api.post("/inquilino/create", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getTenants() {
  try {
    const { data } = await api("inquilino");
    const response = dashboardTenantsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getTenantById(id: Inquilino["inquilinoId"]) {
  try {
    const { data } = await api(`inquilino/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

type tenantAPIType = {
  formData: InquilinoFormData;
  inquilinoId: Inquilino["inquilinoId"];
};

export async function updateTenant({ formData, inquilinoId }: tenantAPIType) {
  try {
    const { data } = await api.patch(`inquilino/${inquilinoId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function deleteTenat(id: Inquilino["inquilinoId"]) {
  try {
    const { data } = await api.delete(`inquilino/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
