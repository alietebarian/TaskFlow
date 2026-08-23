'use client'

import { useQuery } from "@tanstack/react-query"
import { getComments } from "../api/comment-api"

export function useComments(taskId: string){
    return useQuery({
        queryFn: () => getComments(taskId),
        queryKey: ['comments', taskId],
        enabled: !!taskId
    })
}