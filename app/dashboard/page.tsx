"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SavingsGrid } from "@/components/savings-grid"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { LogoutButton } from "@/components/LogoutButton" // Asegúrate de que la ruta sea correcta

export default function Dashboard() {
  useAuthGuard()
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white">
      <div className="w-full flex justify-between items-center mb-4">
        <DashboardHeader />
        <LogoutButton />
      </div>
      <SavingsGrid />
    </main>
  )
}
