import { SavingDetail } from "@/components/saving-detail"

export default function SavingDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white">
      <SavingDetail id={params.id} />
    </main>
  )
}
