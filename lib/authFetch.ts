import { getToken, clearToken } from "./auth"

export async function authFetch<T>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers = new Headers(init.headers)

  if (token) headers.set("Authorization", `Bearer ${token}`)

  const res = await fetch(input, { ...init, headers })

  if (res.status === 401) {
    clearToken()
    // redirección suave al login
    if (typeof window !== "undefined") window.location.href = "/login"
    throw new Error("No autorizado")
  }

  if (!res.ok) {
    throw new Error(await res.text())
  }
  return res.json()
}
