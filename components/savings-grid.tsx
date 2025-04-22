"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, PiggyBank } from "lucide-react"
import { useRouter } from "next/navigation"

// Tipo para los datos de ahorro
type Saving = {
  id: string
  name: string
  amount: number
}

export function SavingsGrid() {
  // Mock data inicial
  const [savings, setSavings] = useState<Saving[]>([
    { id: "1", name: "Nombre Ahorro 1", amount: 0 },
    { id: "2", name: "Nombre Ahorro 2", amount: 0 },
    { id: "3", name: "Nombre Ahorro 3", amount: 0 },
  ])

  const [newSavingName, setNewSavingName] = useState("")
  const [open, setOpen] = useState(false)

  const handleAddSaving = () => {
    if (newSavingName.trim()) {
      const newSaving: Saving = {
        id: Date.now().toString(),
        name: newSavingName,
        amount: 0,
      }
      setSavings([...savings, newSaving])
      setNewSavingName("")
      setOpen(false)
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savings.map((saving) => (
          <SavingCard key={saving.id} saving={saving} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center p-6">
              <Plus className="h-8 w-8 mb-2" />
              <span>Añadir nuevo ahorro</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Nuevo Ahorro</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del ahorro</Label>
                <Input
                  id="name"
                  value={newSavingName}
                  onChange={(e) => setNewSavingName(e.target.value)}
                  placeholder="Ej: Vacaciones"
                />
              </div>
            </div>
            <Button onClick={handleAddSaving} className="w-full bg-purple-600 hover:bg-purple-700">
              Crear ahorro
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function SavingCard({ saving }: { saving: Saving }) {
  const router = useRouter()

  return (
    <Card
      className="overflow-hidden bg-pink-100 border-0 shadow-md cursor-pointer transition-transform hover:scale-105"
      onClick={() => router.push(`/savings/${saving.id}`)}
    >
      <CardHeader className="p-4 bg-blue-400 text-white font-medium">{saving.name}</CardHeader>
      <CardContent className="p-6 flex justify-between items-center">
        <p className="text-gray-700 font-medium">${saving.amount.toFixed(2)}</p>
        <Button variant="ghost" className="p-2 hover:bg-pink-200">
          <PiggyBank className="h-6 w-6 text-gray-600" />
        </Button>
      </CardContent>
    </Card>
  )
}
