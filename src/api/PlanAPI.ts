import { planSchema, Plan } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { z } from "zod";

const planArraySchema = z.array(planSchema);

export async function getPlans(): Promise<Plan[]> {
  try {
    const { data } = await api("/plan");
    const response = planArraySchema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      throw new Error("Formato de datos inválido");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}