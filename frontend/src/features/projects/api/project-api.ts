import { apiClient } from "@/lib/api-client";
import { Project } from "../types/projects";
import { CreateProjectFormValues } from "../schemas/create-project-schema";

export async function getProjects(workspaceId: string): Promise<Project[]> {
  const response = await apiClient.get<Project[]>(
    `/workspace/${workspaceId}/projects`,
  );
  return response.data;
}

export async function createProject(
  workspaceId: string,
  data: CreateProjectFormValues,
): Promise<string> {
  const response = await apiClient.post<string>(
    `/workspace/${workspaceId}/projects`,
    data,
  );

  return response.data;
}
