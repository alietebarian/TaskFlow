'use client'

import { useQuery } from "@tanstack/react-query"
import { getWorkspaces } from "../api/workspace-api"

export function useWorkspaces(){
    return useQuery({
        queryFn: getWorkspaces,
        queryKey: ['workspaces']
    })
}