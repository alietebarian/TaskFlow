import { apiClient } from "@/lib/api-client";
import { Workspace } from "../types/workspace";
import { CreateWorkspaceFormValues } from "../schema/create-workspace-schema";
import { WorkspaceStats } from "../types/workspace-stats";
import { WorkspaceMember } from "../types/member";
import { AddMemberFormValues } from "../schema/add-member-schema";

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

export async function getMembers(
  workspaceId: string,
): Promise<WorkspaceMember[]> {
  const response = await apiClient.get<WorkspaceMember[]>(
    `/workspace/${workspaceId}/members`,
  );
  return response.data;
}

export async function addMember(
  workspaceId: string,
  data: AddMemberFormValues,
): Promise<void> {
  await apiClient.post(`/workspace/${workspaceId}/members`, data);
}