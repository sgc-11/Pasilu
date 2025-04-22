"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fingerprint, Scan } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En un caso real, aquí iría la lógica de autenticación
    router.push("/dashboard")
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-pink-100 rounded-3xl shadow-lg">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-4xl font-bold text-purple-700">Pasilu</h1>
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
          <div className="absolute inset-2 bg-purple-300 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-pink-50 border-pink-200 h-12 text-center"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-pink-50 border-pink-200 h-12 text-center"
          />
        </div>
        <div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10">
            Ingresar
          </Button>
        </div>
      </form>

      <div className="flex justify-center space-x-12 pt-4">
        <div className="flex flex-col items-center">
          <Button variant="ghost" className="rounded-full p-3 bg-gray-100">
            <Fingerprint className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <Button variant="ghost" className="rounded-full p-3 bg-gray-100">
            <Scan className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="text-center space-y-2 text-sm">
        <p className="text-gray-600">
          ¿Aún no tienes tu cuenta?{" "}
          <Link href="#" className="text-purple-700 font-semibold">
            Registrarse
          </Link>
        </p>
        <p>
          <Link href="#" className="text-purple-700 font-semibold">
            Olvidé mi contraseña
          </Link>
        </p>
      </div>
    </div>
  )
}
