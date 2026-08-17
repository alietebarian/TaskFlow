"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser } from "@/features/auth/api/auth-api";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (token) => {
      localStorage.setItem("token", token);
      router.replace("/dashboard");
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
}
