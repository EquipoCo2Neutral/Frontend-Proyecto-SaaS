import { InquilinoFormData } from "@/types/index";
import api from "@/lib/axios";

export async function createTenant(formData: InquilinoFormData) {
  try {
    const { data } = await api.post("/inquilino/create", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
