"use client"

import { X, Cpu, HardDrive, MemoryStick, Monitor, Wifi, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface DeviceConfig {
  id: string
  name: string
  type: string
  status: "online" | "offline" | "maintenance"
  processor: string
  memory: string
  storage: string
  network: string
  display?: string
  battery?: string
  os: string
  lastUpdate: string
  location: string
  ipAddress: string
}

interface DevicePopupProps {
  device: DeviceConfig | null
  isOpen: boolean
  onClose: () => void
}

export function DevicePopup({ device, isOpen, onClose }: DevicePopupProps) {
  if (!isOpen || !device) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "offline":
        return "Offline"
      case "maintenance":
        return "Manutenção"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl">{device.name}</CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`} />
              {getStatusText(device.status)}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações Básicas */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Informações Gerais
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <p className="font-medium">{device.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sistema Operacional</p>
                <p className="font-medium">{device.os}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="font-medium">{device.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">IP</p>
                <p className="font-medium font-mono text-sm">{device.ipAddress}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Especificações Técnicas */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Especificações Técnicas
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Cpu className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Processador</p>
                  <p className="font-medium">{device.processor}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <MemoryStick className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Memória RAM</p>
                  <p className="font-medium">{device.memory}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <HardDrive className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Armazenamento</p>
                  <p className="font-medium">{device.storage}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Wifi className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Rede</p>
                  <p className="font-medium">{device.network}</p>
                </div>
              </div>

              {device.display && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Monitor className="h-5 w-5 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Display</p>
                    <p className="font-medium">{device.display}</p>
                  </div>
                </div>
              )}

              {device.battery && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Battery className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bateria</p>
                    <p className="font-medium">{device.battery}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Informações de Sistema */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Sistema</h3>
            <div>
              <p className="text-sm text-muted-foreground">Última Atualização</p>
              <p className="font-medium">{device.lastUpdate}</p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              Editar Configurações
            </Button>
            <Button variant="outline" className="flex-1">
              Reiniciar Dispositivo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
