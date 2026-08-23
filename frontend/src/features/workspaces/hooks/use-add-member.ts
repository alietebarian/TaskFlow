'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMember } from "../api/workspace-api";
import { toast } from "sonner";
import { AddMemberFormValues } from "../schema/add-member-schema";

export function useAddMember(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddMemberFormValues) => addMember(workspaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });
      toast.success("Member added successfully");
    },
    onError: () => {
      toast.error("Failed to create workspace");
    },
  });
}
