"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HardwareTab } from "@/components/tabs/hardware-tab"
import { SoftwareTab } from "@/components/tabs/software-tab"
import { RedeTab } from "@/components/tabs/rede-tab"
import { BancoDadosTab } from "@/components/tabs/banco-dados-tab"
import { Overview } from "@/components/dashboard/overview"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticação
    const auth = localStorage.getItem("et-wicca-auth")
    const userData = localStorage.getItem("et-wicca-user")

    if (!auth || auth !== "authenticated") {
      router.push("/")
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Sistema de Gestão de TI - ET & WICCA"
        subheading={`Bem-vindo, ${user.name}! Gerencie todos os recursos de tecnologia da empresa em um só lugar.`}
      />
      <Tabs defaultValue="visao-geral" className="space-y-4">
        <TabsList className="grid grid-cols-6 h-auto">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
          <TabsTrigger value="rede">Rede</TabsTrigger>
          <TabsTrigger value="banco-dados">Banco de Dados</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="space-y-4">
          <Overview />
        </TabsContent>

        <TabsContent value="hardware" className="space-y-4">
          <HardwareTab />
        </TabsContent>

        <TabsContent value="software" className="space-y-4">
          <SoftwareTab />
        </TabsContent>

        <TabsContent value="rede" className="space-y-4">
          <RedeTab />
        </TabsContent>

        <TabsContent value="banco-dados" className="space-y-4">
          <BancoDadosTab />
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios ET & WICCA</CardTitle>
              <CardDescription>
                Visualize relatórios detalhados sobre os recursos de tecnologia da empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Inventário Completo</CardTitle>
                  <CardDescription>Relatório de todos os ativos de TI da ET & WICCA</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Licenças a Vencer</CardTitle>
                  <CardDescription>Licenças que vencem nos próximos 30 dias</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Manutenções Programadas</CardTitle>
                  <CardDescription>Calendário de manutenções futuras</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Custos de TI</CardTitle>
                  <CardDescription>Análise de custos mensais e anuais</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Performance da Rede</CardTitle>
                  <CardDescription>Relatório de performance e disponibilidade</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Backup e Segurança</CardTitle>
                  <CardDescription>Status de backups e segurança dos dados</CardDescription>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
