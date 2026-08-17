'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createWorkspace } from "../api/workspace-api"
import { toast } from "sonner"

export function useCreateWorkspace() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            toast.success("Workspace created successfully")
        },
        onError: () => {
            toast.error("Failed to create workspace")
        }
    })
}