export interface User {
    id: string
    name: string
    lastname: string
    mail: string
}

const TOKEN_KEY = "jwt"

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
    return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY): null
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
}

/* Login remoto */
export async function loginRequest(mail: string, password: string) {
    const res = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mail, password}),
    }
    )

    if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(error)
    }

    return res.json() as Promise<{ token: string } & User>
}