"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/task-api";

export function useTasks(projectId: string) {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
    enabled: !!projectId,
  });
}
