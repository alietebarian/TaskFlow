'use client'

import { useQuery } from "@tanstack/react-query"
import { getProjects } from "../api/project-api"

export function useProjects(workspaceId: string){
    return useQuery({
        queryKey: ['projects', workspaceId],
        queryFn: () => getProjects(workspaceId),
        enabled: !!workspaceId
    })
}