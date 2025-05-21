// src/hooks/useAuthGuard.ts
"use client"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuthGuard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.replace("/")
    }
  }, [user, router])
}
