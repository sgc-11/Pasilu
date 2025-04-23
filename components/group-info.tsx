"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users, Gavel } from "lucide-react"

type Member = {
  id: string
  username: string
}

type GroupRule = {
  title: string
  description: string
}

export function GroupInfo({ savingId }: { savingId: string }) {
  const router = useRouter()

  // Datos de ejemplo para los miembros del grupo
  const members: Member[] = [
    { id: "1", username: "SofiaRamirez02" },
    { id: "2", username: "Juan_perez_18" },
    { id: "3", username: "MarianaTorres19" },
    { id: "4", username: "Carlos_Mendoza" },
    { id: "5", username: "ValentinaGomez" },
    { id: "6", username: "AndresHerrera" },
    { id: "7", username: "LauraFernandez" },
    { id: "8", username: "Felipe_Rios_190" },
    { id: "9", username: "Camila_Estrada" },
    { id: "10", username: "DanielOspina_2" },
  ]

  // Datos de ejemplo para las reglas del grupo
  const rules: GroupRule[] = [
    {
      title: "Aporte mínimo:",
      description: "Cada miembro debe aportar al menos $50,000 mensuales.",
    },
    {
      title: "Frecuencia de aportes:",
      description: "Se pueden realizar consignaciones en cualquier momento, pero mínimo una vez al mes.",
    },
    {
      title: "Retiros aprobados:",
      description: "Un retiro solo será aprobado si todos los miembros del grupo lo aceptan.",
    },
    {
      title: "Salida del grupo:",
      description:
        "Un integrante puede retirarse en cualquier momento y recibirá su dinero más los intereses generados.",
    },
    {
      title: "Cambio de líder:",
      description: "En caso de que el líder desee salir del grupo, debe elegir a un nuevo líder antes de retirarse.",
    },
  ]

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" className="p-2" onClick={() => router.push(`/savings/${savingId}`)}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h2 className="text-2xl font-bold">Información del grupo</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-pink-100 border-0 shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-purple-700 text-white p-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">Integrantes</h3>
            </div>
            <div className="p-4 space-y-2">
              {members.map((member) => (
                <div key={member.id} className="py-1 border-b border-pink-200 last:border-0">
                  {member.username}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pink-100 border-0 shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-purple-700 text-white p-4 flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              <h3 className="font-semibold">Reglas</h3>
            </div>
            <div className="p-4 space-y-4">
              {rules.map((rule, index) => (
                <div key={index}>
                  <p className="font-semibold">{rule.title}</p>
                  <p className="text-sm">{rule.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
