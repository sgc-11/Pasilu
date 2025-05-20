"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fingerprint, Scan } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"

/* Pequeño helper para peticiones POST */
async function post<T, B = unknown>(url: string, body: B): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // por si luego usas cookies
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const msg = (await res.json().catch(() => ({}))).error ?? res.statusText
    throw new Error(msg)
  }
  return res.json()
}

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message ?? "Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-pink-100 rounded-3xl shadow-lg">
      {/* ---------- Encabezado ---------- */}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-4xl font-bold text-purple-700">Pasilu</h1>

        {/* Avatar con check animado */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full" />
          <div className="absolute inset-2 bg-purple-300 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
              {/* Ícono de usuario */}
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            {/* Check */}
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
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* ---------- Formulario ---------- */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          placeholder="Correo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-pink-50 border-pink-200 h-12 text-center"
        />

        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-pink-50 border-pink-200 h-12 text-center"
        />

        {error && <p className="text-red-600 text-center">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>

      {/* ---------- Botones secundarios (huella / scan) ---------- */}
      <div className="flex justify-center space-x-12 pt-4">
        <Button variant="ghost" className="rounded-full p-3 bg-gray-100">
          <Fingerprint className="h-6 w-6 text-gray-600" />
        </Button>
        <Button variant="ghost" className="rounded-full p-3 bg-gray-100">
          <Scan className="h-6 w-6 text-gray-600" />
        </Button>
      </div>

      {/* ---------- Links ---------- */}
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
