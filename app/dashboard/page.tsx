import { DashboardHeader } from "@/components/dashboard-header"
import { SavingsGrid } from "@/components/savings-grid"

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white">
      <DashboardHeader />
      <SavingsGrid />
    </main>
  )
}
