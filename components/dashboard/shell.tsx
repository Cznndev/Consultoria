"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, HardDrive, Network, BarChart3, FileText, Users, Settings } from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("et-wicca-user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: true },
    { icon: HardDrive, label: "Hardware", href: "/dashboard#hardware" },
    { icon: FileText, label: "Software", href: "/dashboard#software" },
    { icon: Network, label: "Rede", href: "/dashboard#rede" },
    { icon: Database, label: "Banco de Dados", href: "/dashboard#banco-dados" },
    { icon: Activity, label: "Monitoramento", href: "/dashboard#monitoramento" },
    { icon: Users, label: "Usuários", href: "/dashboard#usuarios" },
    { icon: Settings, label: "Configurações", href: "/dashboard#configuracoes" },
  ]

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="fixed top-0 z-30 -ml-2 hidden h-screen w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:px-8">
          <nav className="grid items-start gap-2">
            <div className="group flex flex-col gap-4 py-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-primary">ET & WICCA TI</h2>
                {user && (
                  <Badge variant="outline" className="text-xs">
                    {user.role === "admin" ? "Admin" : user.role === "ti" ? "TI" : "Gestor"}
                  </Badge>
                )}
              </div>
              <div className="grid gap-1">
                {menuItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted ${
                        item.active ? "bg-muted text-primary" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  )
                })}
              </div>

              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Status do Sistema</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Servidores</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rede</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Estável
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      OK
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">{children}</main>
    </div>
  )
}
