import { AdquisicionFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createAcquisition(formData: AdquisicionFormData) {
  try {
    const { data } = await api.post("/adquisiciones", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
