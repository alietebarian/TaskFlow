import { apiClient } from "@/lib/api-client";
import { ActivityLogEntry } from "../types/activity-log";

export async function getActivityLog(
  taskId: string,
): Promise<ActivityLogEntry[]> {
  const response = await apiClient.get<ActivityLogEntry[]>(
    `/tasks/${taskId}/activity`,
  );
  return response.data;
}
