"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTaskStatus } from "../api/task-api";
import { PaginatedResponse, Task, TaskStatus } from "../types/task";

export function useUpdateTaskStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      newStatus,
    }: {
      taskId: string;
      newStatus: TaskStatus;
    }) => updateTaskStatus(taskId, newStatus),

    onMutate: async ({ taskId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousData = queryClient.getQueryData<PaginatedResponse<Task>>([
        "tasks",
        projectId,
      ]);

      queryClient.setQueryData<PaginatedResponse<Task>>(
        ["tasks", projectId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((task) =>
              task.id === taskId ? { ...task, status: newStatus } : task,
            ),
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["tasks", projectId], context.previousData);
      }
      toast.error("Failed to update task status");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });
}
