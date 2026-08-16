import { apiClient } from "@/lib/api-client";
import { RegisterFormValues } from "../schemas/register-shcema"; 
import { LoginFormValue } from "../schemas/login-schema";

export async function registerUser(data: RegisterFormValues): Promise<string> {
  const response = await apiClient.post<string>("/auth/register", data);

  return response.data;
}

export async function loginUser(data: LoginFormValue) : Promise<string>{
  const response = await apiClient.post<string>("/auth/login", data);

  return response.data;
}