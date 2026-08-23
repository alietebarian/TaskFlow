import { z } from "zod";

export const addMemberSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format")
})

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
