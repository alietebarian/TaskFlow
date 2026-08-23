import { useQuery } from "@tanstack/react-query";
import { getWorkspaceStats } from "../api/workspace-api";


export function useWorkspaceStats(workspaceId: string){
    return useQuery({
      queryFn: () => getWorkspaceStats(workspaceId),
      queryKey: ["workspace-stats", workspaceId],
      enabled: !!workspaceId,
    });
}