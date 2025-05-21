import { authFetch } from "@/lib/authFetch"

export type Wallet = {
  id: string
  name: string
  currentBalance: number
}

export async function getMyWallets(): Promise<Wallet[]> {
  const api = process.env.NEXT_PUBLIC_API_URL!
  return authFetch<Wallet[]>(`${api}/wallets`)
}

export async function createWallet(name: string, notes = ""): Promise<Wallet> {
  const api = process.env.NEXT_PUBLIC_API_URL!
  return authFetch<Wallet>(`${api}/wallets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, notes }),
  })
}

