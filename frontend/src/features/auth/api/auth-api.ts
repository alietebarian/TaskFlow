import { apiClient } from "@/lib/api-client";
import { RegisterFormValues } from "../schemas/register-shcema"; 

export async function registerUser(data: RegisterFormValues): Promise<string> {
  const response = await apiClient.post<string>("/auth/register", data);

  return response.data;
}
