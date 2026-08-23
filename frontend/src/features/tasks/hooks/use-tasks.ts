"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/task-api";
import { TaskFilters } from "../types/task";

export function useTasks(projectId: string, filters?: TaskFilters) {
  return useQuery({
    queryKey: ["tasks", projectId, filters],
    queryFn: () => getTasks(projectId, filters),
    enabled: !!projectId,
  });
}
