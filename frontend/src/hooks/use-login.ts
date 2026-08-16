'use client'

import { loginUser } from "@/features/auth/api/auth-api"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useLogin(){
    const router = useRouter()

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (token) => {
            localStorage.setItem('token', token)
            router.replace('/dashboard')
        },
        onError: () => {
            toast.error("Login failed. Please try again.");
        }
    })
}