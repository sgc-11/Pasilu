"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContributionDialog() {
  const router = useRouter()
  const [bank, setBank] = useState("")

  const handleGoToBank = () => {
    if (!bank) return

    // En un caso real, aquí redirigiriamos al banco seleccionado
    // Por ahora, simplemente volvemos a la página de detalle
    router.back()
  }

  return (
    <div className="w-full max-w-md p-8 bg-pink-100 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">Genial, realizarás un aporte!</h2>

      <div className="space-y-6">
        <Select value={bank} onValueChange={setBank}>
          <SelectTrigger className="bg-white border-pink-200 h-12">
            <SelectValue placeholder="Selecciona tu banco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bancolombia">Bancolombia</SelectItem>
            <SelectItem value="davivienda">Davivienda</SelectItem>
            <SelectItem value="bbva">BBVA</SelectItem>
            <SelectItem value="banco-de-bogota">Banco de Bogotá</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-center text-sm text-gray-600">Serás redirigido a tu banco para realizar la consignación</p>

        <div className="pt-4">
          <Button onClick={handleGoToBank} className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10">
            Ir al banco
          </Button>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => router.back()} className="bg-red-400 hover:bg-red-500 text-white px-6">
            Salir
          </Button>
        </div>
      </div>
    </div>
  )
}
