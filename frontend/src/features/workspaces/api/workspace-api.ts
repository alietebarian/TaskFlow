import { apiClient } from "@/lib/api-client";
import { Workspace } from "../types/workspace";
import { CreateWorkspaceFormValues } from "../schema/create-workspace-schema";

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await apiClient.get<Workspace[]>("/workspace");

  return response.data;
}

export async function createWorkspace(
  data: CreateWorkspaceFormValues,
): Promise<string> {
  const response = await apiClient.post<string>("/workspace", data);
  return response.data;
}
