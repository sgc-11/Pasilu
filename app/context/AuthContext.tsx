// src/context/AuthContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { loginRequest, setToken, getToken, clearToken, User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  /* carga inicial si ya hay token (opcional: pedir /me) */
  useEffect(() => {
    if (getToken()) {
      // opcional: solicitar /api/v1/users/me
      // setUser(...)
    }
  }, [])

  async function login(email: string, password: string) {
    const res = await loginRequest(email, password)
    setToken(res.token)
    setUser(res)
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>")
  return ctx
}
