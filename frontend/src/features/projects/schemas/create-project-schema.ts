import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),

  description: z.string().optional(),
});


export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;