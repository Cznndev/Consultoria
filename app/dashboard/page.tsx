import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HardwareTab } from "@/components/tabs/hardware-tab"
import { SoftwareTab } from "@/components/tabs/software-tab"
import { RedeTab } from "@/components/tabs/rede-tab"
import { BancoDadosTab } from "@/components/tabs/banco-dados-tab"
import { Overview } from "@/components/dashboard/overview"

export const metadata: Metadata = {
  title: "Dashboard - Sistema de Gestão de TI",
  description: "Dashboard para gestão de recursos de tecnologia",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        subheading="Gerencie todos os recursos de tecnologia da sua empresa em um só lugar."
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
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Visualize relatórios detalhados sobre seus recursos de tecnologia.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Inventário Completo</CardTitle>
                  <CardDescription>Relatório de todos os ativos de TI</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Licenças a Vencer</CardTitle>
                  <CardDescription>Licenças que vencem nos próximos 30 dias</CardDescription>
                </Card>
                <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="text-base">Manutenções Programadas</CardTitle>
                  <CardDescription>Calendário de manutenções futuras</CardDescription>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
