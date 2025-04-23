"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export function NewSavingDialog() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [groupSize, setGroupSize] = useState("")

  const handleCreate = () => {
    if (!name.trim()) return

    // En un caso real, aquí enviaríamos los datos a una API
    const newSavingId = Date.now().toString()

    // Redirigir al dashboard después de crear
    router.push("/dashboard")
  }

  return (
    <div className="w-full max-w-md p-8 bg-pink-100 rounded-3xl shadow-lg">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="p-2" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h2 className="text-2xl font-bold text-center flex-1 mr-8">Nuevo Ahorro</h2>
      </div>

      <div className="space-y-6">
        <Input
          placeholder="Asígnale un nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-pink-50 border-pink-200 h-12"
        />

        <Input
          placeholder="¿Cuál es la meta?"
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="bg-pink-50 border-pink-200 h-12"
        />

        <Input
          placeholder="¿Qué tan grande será tu grupo?"
          type="number"
          min="1"
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
          className="bg-pink-50 border-pink-200 h-12"
        />

        <div className="pt-4">
          <Button onClick={handleCreate} className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10">
            Crear
          </Button>
        </div>
      </div>
    </div>
  )
}
