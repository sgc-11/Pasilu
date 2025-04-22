import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <div className="w-full max-w-4xl flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold text-purple-700">Pasilu</h1>
        <p className="text-xl font-medium text-gray-700">¡Bienvenido de vuelta!</p>
      </div>
      <Avatar className="h-16 w-16 border-4 border-purple-100">
        <AvatarImage src="/placeholder.svg" alt="Usuario" />
        <AvatarFallback className="bg-purple-300 text-purple-700 text-xl">U</AvatarFallback>
      </Avatar>
    </div>
  )
}
