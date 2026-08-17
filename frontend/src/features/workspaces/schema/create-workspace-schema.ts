import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" }).max(100, { message: "Workspace name must be less than 100 characters" }),
});

export type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;