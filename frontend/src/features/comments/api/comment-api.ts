import { apiClient } from "@/lib/api-client";
import { Comment } from "../types/comment";

export async function getComments(taskId: string): Promise<Comment[]> {
  const response = await apiClient.get<Comment[]>(`/tasks/${taskId}/comments`);
  return response.data;
}

export async function createComment(
  taskId: string,
  content: string,
): Promise<string> {
  const response = await apiClient.post<string>(`/tasks/${taskId}/comments`, {
    content,
  });
  return response.data;
}
