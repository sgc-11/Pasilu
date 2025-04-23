import { GroupInfo } from "@/components/group-info"

export default function GroupInfoPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white">
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-bold text-purple-700">Pasilu</h1>
      </div>
      <GroupInfo savingId={params.id} />
    </main>
  )
}
