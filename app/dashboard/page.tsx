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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("visao-geral")
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

  // Função para navegar entre abas (será chamada pelo DashboardShell)
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
  }

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

  // Definir abas baseadas no nível de acesso
  const getAvailableTabs = () => {
    const baseTabs = [{ value: "visao-geral", label: "Visão Geral", component: <Overview /> }]

    if (user.role === "admin") {
      return [
        ...baseTabs,
        { value: "hardware", label: "Hardware", component: <HardwareTab /> },
        { value: "software", label: "Software", component: <SoftwareTab /> },
        { value: "rede", label: "Rede", component: <RedeTab /> },
        { value: "banco-dados", label: "Banco de Dados", component: <BancoDadosTab /> },
        { value: "relatorios", label: "Relatórios", component: <RelatoriosTab userRole="admin" /> },
      ]
    } else if (user.role === "ti") {
      return [
        ...baseTabs,
        { value: "hardware", label: "Hardware", component: <HardwareTab /> },
        { value: "software", label: "Software", component: <SoftwareTab /> },
        { value: "rede", label: "Rede", component: <RedeTab /> },
        { value: "banco-dados", label: "Banco de Dados", component: <BancoDadosTab /> },
      ]
    } else if (user.role === "gestor") {
      return [...baseTabs, { value: "relatorios", label: "Relatórios", component: <RelatoriosTab userRole="gestor" /> }]
    }

    return baseTabs
  }

  const availableTabs = getAvailableTabs()

  return (
    <DashboardShell onTabChange={handleTabChange} activeTab={activeTab}>
      <DashboardHeader
        heading="Sistema de Gestão de TI - ET & WICCA"
        subheading={`Bem-vindo, ${user.name}! Gerencie todos os recursos de tecnologia da empresa em um só lugar.`}
      />

      {/* Alerta de nível de acesso */}
      <Alert className="mb-4">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Você está logado como{" "}
          <strong>{user.role === "admin" ? "Administrador" : user.role === "ti" ? "Técnico de TI" : "Gestor"}</strong>.
          {user.role === "gestor" && " Você tem acesso apenas à visão geral e relatórios."}
          {user.role === "ti" && " Você tem acesso a hardware, software, rede e banco de dados."}
          {user.role === "admin" && " Você tem acesso completo ao sistema."}
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList
          className={`grid h-auto ${availableTabs.length <= 3 ? "grid-cols-3" : availableTabs.length <= 4 ? "grid-cols-4" : availableTabs.length <= 5 ? "grid-cols-5" : "grid-cols-6"}`}
        >
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {availableTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardShell>
  )
}

// Componente de Relatórios com controle de acesso
function RelatoriosTab({ userRole }: { userRole: string }) {
  const adminReports = [
    { title: "Inventário Completo", description: "Relatório de todos os ativos de TI da ET & WICCA" },
    { title: "Licenças a Vencer", description: "Licenças que vencem nos próximos 30 dias" },
    { title: "Manutenções Programadas", description: "Calendário de manutenções futuras" },
    { title: "Custos de TI", description: "Análise de custos mensais e anuais" },
    { title: "Performance da Rede", description: "Relatório de performance e disponibilidade" },
    { title: "Backup e Segurança", description: "Status de backups e segurança dos dados" },
    { title: "Usuários do Sistema", description: "Relatório de usuários e permissões" },
    { title: "Logs de Auditoria", description: "Histórico de ações no sistema" },
    { title: "Análise de Vulnerabilidades", description: "Relatório de segurança e vulnerabilidades" },
  ]

  const gestorReports = [
    { title: "Resumo Executivo", description: "Visão geral dos recursos de TI para gestão" },
    { title: "Custos de TI", description: "Análise de custos mensais e anuais" },
    { title: "Indicadores de Performance", description: "KPIs e métricas de TI" },
    { title: "Status Geral dos Sistemas", description: "Disponibilidade e status dos sistemas" },
    { title: "Planejamento de Orçamento", description: "Projeções e planejamento financeiro" },
  ]

  const reports = userRole === "admin" ? adminReports : gestorReports

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios ET & WICCA - {userRole === "admin" ? "Administrador" : "Gestor"}</CardTitle>
        <CardDescription>
          {userRole === "admin"
            ? "Acesso completo a todos os relatórios técnicos e administrativos."
            : "Relatórios executivos e de gestão para tomada de decisões estratégicas."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <Card key={index} className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50">
              <CardTitle className="text-base">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
