'use client'

import { useQuery } from "@tanstack/react-query";
import { getActivityLog } from "../api/activity-log-api";

export function useActivityLog(taskId: string) {
  return useQuery({
    queryFn:() => getActivityLog(taskId),
    queryKey: ["activitylog", taskId],
    enabled: !!taskId
  });
}