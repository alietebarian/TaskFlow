import { apiClient } from "@/lib/api-client";
import { PaginatedResponse, Task } from "../types/task";
import { CreateTaskFormValues } from "../schemas/create-task-schema";

const PRIORITY_MAP: Record<string, number> = {
  Low: 0,
  Medium: 1,
  High: 2,
  Urgent: 3,
};

const STATUS_MAP: Record<string, number> = {
  Todo: 0,
  InProgress: 1,
  Done: 2,
};

export async function getTasks(projectId: string): Promise<PaginatedResponse<Task>> {
  const response = await apiClient.get<PaginatedResponse<Task>>(`/project/${projectId}/tasks`);
  return response.data;
}

export async function createTask(
  projectId: string,
  data: CreateTaskFormValues,
): Promise<string> {
  const response = await apiClient.post<string>(`/project/${projectId}/tasks`, {
    title: data.title,
    description: data.description,
    priority: PRIORITY_MAP[data.priority],
    dueDate: data.dueDate || null,
  });
  return response.data;
}

export async function updateTaskStatus(taskId: string, newStatus: string) : Promise<void>{
  await apiClient.patch(`/tasks/${taskId}/status`, {
    newStatus: STATUS_MAP[newStatus]
  })
}
