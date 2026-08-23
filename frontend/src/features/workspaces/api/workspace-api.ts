import { apiClient } from "@/lib/api-client";
import { Workspace } from "../types/workspace";
import { CreateWorkspaceFormValues } from "../schema/create-workspace-schema";
import { WorkspaceStats } from "../types/workspace-stats";

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

export async function getWorkspaceStats(
  workspaceId: string,
): Promise<WorkspaceStats> {
  const response = await apiClient.get<WorkspaceStats>(
    `/workspace/${workspaceId}/stats`,
  );
  return response.data;
}
