"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, PiggyBank } from "lucide-react"
import { useRouter } from "next/navigation"
import { useWallets } from "@/hooks/useWallets"
import { Wallet } from "@/lib/wallets"

export function SavingsGrid() {
  const { wallets, loading, error, addWallet } = useWallets()
  const router = useRouter()

  if (loading) return <p>Cargando...</p>
  if (error)   return <p className="text-red-600">{error}</p>

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wallets.map((w) => (
          <SavingCard key={w.id} saving={w} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          className="rounded-full bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center p-6"
          onClick={async () => {
            const name = prompt("Nombre del nuevo ahorro")?.trim()
            if (name) await addWallet(name)
          }}
        >
          <Plus className="h-8 w-8 mb-2" />
          <span>Añadir nuevo ahorro</span>
        </Button>
      </div>
    </div>
  )
}

/* SavingCard igual, pero usa Wallet */
function SavingCard({ saving }: { saving: Wallet }) {
  const router = useRouter()
  return (
    <Card
      className="overflow-hidden bg-pink-100 border-0 shadow-md cursor-pointer transition-transform hover:scale-105"
      onClick={() => router.push(`/savings/${saving.id}`)}
    >
      <CardHeader className="p-4 bg-blue-400 text-white font-medium">
        {saving.name}
      </CardHeader>
      <CardContent className="p-6 flex justify-between items-center">
        <p className="text-gray-700 font-medium">${saving.currentBalance.toFixed(2)}</p>
        <Button variant="ghost" className="p-2 hover:bg-pink-200">
          <PiggyBank className="h-6 w-6 text-gray-600" />
        </Button>
      </CardContent>
    </Card>
  )
}

