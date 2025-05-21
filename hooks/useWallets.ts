"use client"
import { useEffect, useState } from "react"
import { Wallet, getMyWallets, createWallet } from "@/lib/wallets"

export function useWallets() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getMyWallets()
      .then(setWallets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function addWallet(name: string, notes = "") {
    const w = await createWallet(name, notes)
    setWallets((prev) => [...prev, w])
  }

  return { wallets, loading, error, addWallet }
}
