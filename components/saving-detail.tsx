"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  PiggyBank,
  BarChart3,
  UserPlus,
  UserMinus,
  DollarSign,
  LogOut,
  ArrowDownCircle,
  Settings,
  Home,
} from "lucide-react"

// Tipo para los datos de ahorro
type Saving = {
  id: string
  name: string
  amount: number
  targetAmount: number
}

export function SavingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [saving, setSaving] = useState<Saving | null>(null)
  const [loading, setLoading] = useState(true)
  const [contributionAmount, setContributionAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [openContribute, setOpenContribute] = useState(false)
  const [openWithdraw, setOpenWithdraw] = useState(false)
  const [openTarget, setOpenTarget] = useState(false)

  // Simular la carga de datos
  useEffect(() => {
    // En un caso real, aquí se cargarían los datos desde una API
    const mockSavings: Record<string, Saving> = {
      "1": { id: "1", name: "Nombre Ahorro 1", amount: 0, targetAmount: 0 },
      "2": { id: "2", name: "Nombre Ahorro 2", amount: 0, targetAmount: 0 },
      "3": { id: "3", name: "Nombre Ahorro 3", amount: 0, targetAmount: 0 },
    }

    setTimeout(() => {
      setSaving(mockSavings[id] || null)
      setLoading(false)
    }, 500)
  }, [id])

  const handleContribute = () => {
    if (!saving || !contributionAmount) return

    const amount = Number.parseFloat(contributionAmount)
    if (isNaN(amount) || amount <= 0) return

    setSaving({
      ...saving,
      amount: saving.amount + amount,
    })
    setContributionAmount("")
    setOpenContribute(false)
  }

  const handleWithdraw = () => {
    if (!saving || !withdrawAmount) return

    const amount = Number.parseFloat(withdrawAmount)
    if (isNaN(amount) || amount <= 0 || amount > saving.amount) return

    setSaving({
      ...saving,
      amount: saving.amount - amount,
    })
    setWithdrawAmount("")
    setOpenWithdraw(false)
  }

  const handleSetTarget = () => {
    if (!saving || !targetAmount) return

    const amount = Number.parseFloat(targetAmount)
    if (isNaN(amount) || amount <= 0) return

    setSaving({
      ...saving,
      targetAmount: amount,
    })
    setTargetAmount("")
    setOpenTarget(false)
  }

  if (loading) {
    return <div className="text-center p-8">Cargando...</div>
  }

  if (!saving) {
    return <div className="text-center p-8">Ahorro no encontrado</div>
  }

  return (
    <div className="w-full max-w-4xl">
      <header className="w-full flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700">Pasilu</h1>
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-purple-700">{saving.name}</span>
          <PiggyBank className="h-8 w-8 text-purple-700" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="bg-pink-100 border-0 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-2">Monto actual:</h2>
            <p className="text-2xl font-bold">${saving.amount.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-pink-100 border-0 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-2">Monto meta:</h2>
            <p className="text-2xl font-bold">${saving.targetAmount.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 mb-10">
        <ActionButton
          icon={<BarChart3 className="h-6 w-6" />}
          label="Historial de movimientos"
          color="bg-blue-300"
          onClick={() => {}}
        />

        <div className="flex flex-col items-center gap-2">
          <div className="text-center mb-1">
            <span className="text-sm">Añadir</span>
          </div>
          <ActionButton icon={<UserPlus className="h-6 w-6" />} color="bg-green-300" onClick={() => {}} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="text-center mb-1">
            <span className="text-sm">Eliminar</span>
          </div>
          <ActionButton icon={<UserMinus className="h-6 w-6" />} color="bg-red-300" onClick={() => {}} />
        </div>

        <Dialog open={openContribute} onOpenChange={setOpenContribute}>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center">
              <ActionButton
                icon={<DollarSign className="h-6 w-6" />}
                label="Realizar aporte"
                color="bg-purple-300"
                onClick={() => router.push(`/savings/${id}/contribute`)}
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Realizar aporte</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Cantidad a aportar</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <Button onClick={handleContribute} className="w-full bg-purple-600 hover:bg-purple-700">
              Confirmar aporte
            </Button>
          </DialogContent>
        </Dialog>

        <ActionButton
          icon={<LogOut className="h-6 w-6" />}
          label="Abandonar ahorro"
          color="bg-purple-300"
          onClick={() => {}}
        />

        <Dialog open={openWithdraw} onOpenChange={setOpenWithdraw}>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center">
              <ActionButton
                icon={<ArrowDownCircle className="h-6 w-6" />}
                label="Retirar dinero"
                color="bg-blue-300"
                onClick={() => {}}
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Retirar dinero</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="withdraw">Cantidad a retirar</Label>
                <Input
                  id="withdraw"
                  type="number"
                  min="0"
                  max={saving.amount}
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <Button onClick={handleWithdraw} className="w-full bg-purple-600 hover:bg-purple-700">
              Confirmar retiro
            </Button>
          </DialogContent>
        </Dialog>

        <ActionButton
          icon={<Settings className="h-6 w-6" />}
          label="Información grupo"
          color="bg-blue-300"
          onClick={() => router.push(`/savings/${id}/group-info`)}
        />
      </div>

      <Dialog open={openTarget} onOpenChange={setOpenTarget}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-6">
            Establecer monto meta
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Establecer monto meta</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="target">Monto meta</Label>
              <Input
                id="target"
                type="number"
                min="0"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <Button onClick={handleSetTarget} className="w-full bg-purple-600 hover:bg-purple-700">
            Confirmar
          </Button>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 flex items-center gap-2"
        >
          <Home className="h-5 w-5" />
          Regresar al inicio
        </Button>
      </div>
    </div>
  )
}

function ActionButton({
  icon,
  label,
  color,
  onClick,
}: {
  icon: React.ReactNode
  label?: string
  color: string
  onClick: () => void
}) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <div className="text-center mb-1">
          <span className="text-sm">{label}</span>
        </div>
      )}
      <Button
        variant="ghost"
        className={`rounded-full p-4 ${color} hover:opacity-90 transition-opacity`}
        onClick={onClick}
      >
        {icon}
      </Button>
    </div>
  )
}
