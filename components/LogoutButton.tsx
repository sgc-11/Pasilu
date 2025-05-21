"use client"

import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()
  return (
    <Button
        onClick={() => {
        logout()
        router.push("/")
      }}
      className="text-sm text-red-600">
        Cerrar Sesión
    </Button>
  )
}
