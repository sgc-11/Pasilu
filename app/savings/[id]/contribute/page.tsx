import { ContributionDialog } from "@/components/contribution-dialog"

export default function ContributePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-purple-700">Pasilu</h1>
      </div>
      <ContributionDialog />
    </main>
  )
}
