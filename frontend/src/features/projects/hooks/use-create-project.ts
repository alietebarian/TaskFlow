"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProjectFormValues } from "../schemas/create-project-schema";
import { createProject } from "../api/project-api";
import { toast } from "sonner";

export function useCreateProject(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectFormValues) =>
      createProject(workspaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", workspaceId] });
      toast.success("Project created successfully");
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });
}
