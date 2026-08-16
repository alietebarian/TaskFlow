import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "firstName is required").max(50),
  lastName: z.string().min(1, "lastName is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;