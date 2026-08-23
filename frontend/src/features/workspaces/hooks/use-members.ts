"use client";

import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/workspace-api";

export function useMembers(workspaceId: string) {
  return useQuery({
    queryFn: () => getMembers(workspaceId),
    queryKey: ["workspace-members", workspaceId],
    enabled: !!workspaceId,
  });
}
