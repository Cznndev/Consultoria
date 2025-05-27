"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { HardwareTab } from "@/components/tabs/hardware-tab"
import { SoftwareTab } from "@/components/tabs/software-tab"
import { RedeTab } from "@/components/tabs/rede-tab"
import { BancoDadosTab } from "@/components/tabs/banco-dados-tab"
import { Overview } from "@/components/dashboard/overview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Activity,
  HardDrive,
  Database,
  Network,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3,
  Thermometer,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

  // Função para renderizar o conteúdo baseado na aba ativa
  const renderActiveContent = () => {
    switch (activeTab) {
      case "visao-geral":
        return <Overview />
      case "hardware":
        if (user.role === "admin" || user.role === "ti") {
          return <HardwareTab />
        }
        return <AccessDenied />
      case "software":
        if (user.role === "admin" || user.role === "ti") {
          return <SoftwareTab />
        }
        return <AccessDenied />
      case "rede":
        if (user.role === "admin" || user.role === "ti") {
          return <RedeTab />
        }
        return <AccessDenied />
      case "banco-dados":
        if (user.role === "admin" || user.role === "ti") {
          return <BancoDadosTab />
        }
        return <AccessDenied />
      case "relatorios":
        return <RelatoriosTab userRole={user.role} />
      case "monitoramento":
        if (user.role === "admin" || user.role === "ti") {
          return <MonitoramentoTab />
        }
        return <AccessDenied />
      case "usuarios":
        if (user.role === "admin") {
          return <UsuariosTab />
        }
        return <AccessDenied />
      case "configuracoes":
        if (user.role === "admin") {
          return <ConfiguracoesTab />
        }
        return <AccessDenied />
      default:
        return <Overview />
    }
  }

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

      {/* Conteúdo da aba ativa */}
      <div className="space-y-4">{renderActiveContent()}</div>
    </DashboardShell>
  )
}

// Componente para acesso negado
function AccessDenied() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acesso Negado</CardTitle>
        <CardDescription>Você não tem permissão para acessar esta seção.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Entre em contato com o administrador do sistema para solicitar acesso.
          </p>
        </div>
      </CardContent>
    </Card>
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

// Componente completo para Monitoramento
function MonitoramentoTab() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    uptime: "99.8%",
    activeUsers: 0,
    systemLoad: 0,
    temperature: 0,
  })

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "CPU do servidor DB-01 acima de 85%",
      time: "2 min atrás",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      message: "Backup automático concluído com sucesso",
      time: "15 min atrás",
      severity: "low",
    },
    {
      id: 3,
      type: "error",
      message: "Falha na conexão com servidor de email",
      time: "1 hora atrás",
      severity: "high",
    },
  ])

  const [systemStatus, setSystemStatus] = useState([
    { name: "Servidor Web", status: "online", uptime: "99.9%", load: 45 },
    { name: "Servidor BD", status: "warning", uptime: "98.5%", load: 87 },
    { name: "Servidor Email", status: "offline", uptime: "95.2%", load: 0 },
    { name: "Servidor Backup", status: "online", uptime: "99.7%", load: 23 },
    { name: "Firewall", status: "online", uptime: "99.9%", load: 12 },
    { name: "Switch Principal", status: "online", uptime: "99.8%", load: 34 },
  ])

  // Simular métricas em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        disk: Math.max(30, Math.min(85, prev.disk + (Math.random() - 0.5) * 5)),
        network: Math.max(5, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
        activeUsers: Math.max(15, Math.min(150, prev.activeUsers + Math.floor((Math.random() - 0.5) * 10))),
        systemLoad: Math.max(0.1, Math.min(3.0, prev.systemLoad + (Math.random() - 0.5) * 0.3)),
        temperature: Math.max(35, Math.min(75, prev.temperature + (Math.random() - 0.5) * 3)),
      }))
    }, 2000)

    // Valores iniciais
    setMetrics({
      cpu: 45,
      memory: 67,
      disk: 52,
      network: 23,
      uptime: "99.8%",
      activeUsers: 87,
      systemLoad: 1.2,
      temperature: 42,
    })

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-blue-500"
      case "warning":
        return "bg-amber-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.cpu.toFixed(1)}%</div>
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    metrics.cpu > 80 ? "bg-blue-800" : metrics.cpu > 60 ? "bg-blue-600" : "bg-blue-400"
                  }`}
                  style={{ width: `${metrics.cpu}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.cpu > 80 ? "Alto uso" : metrics.cpu > 60 ? "Uso moderado" : "Uso normal"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memória</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.memory.toFixed(1)}%</div>
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    metrics.memory > 85 ? "bg-blue-800" : metrics.memory > 70 ? "bg-blue-600" : "bg-blue-400"
                  }`}
                  style={{ width: `${metrics.memory}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{((metrics.memory * 32) / 100).toFixed(1)} GB / 32 GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disco</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.disk.toFixed(1)}%</div>
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    metrics.disk > 90 ? "bg-blue-800" : metrics.disk > 75 ? "bg-blue-600" : "bg-blue-400"
                  }`}
                  style={{ width: `${metrics.disk}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{((metrics.disk * 2) / 100).toFixed(1)} TB / 2 TB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rede</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.network.toFixed(1)}%</div>
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 bg-blue-400`}
                  style={{ width: `${metrics.network}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((metrics.network * 1000) / 100).toFixed(0)} Mbps / 1 Gbps
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Secundárias */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.uptime}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Usuários Ativos</p>
                <p className="text-2xl font-bold text-blue-500">{metrics.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Load Average</p>
                <p className="text-2xl font-bold text-blue-700">{metrics.systemLoad.toFixed(2)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Temperatura</p>
                <p className="text-2xl font-bold text-blue-800">{metrics.temperature.toFixed(0)}°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Performance em Tempo Real */}
      <Card>
        <CardHeader>
          <CardTitle>Performance em Tempo Real</CardTitle>
          <CardDescription>Monitoramento contínuo dos recursos do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <div className="flex h-full items-end justify-between gap-1">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-600 rounded-t transition-all duration-300"
                  style={{
                    height: `${Math.max(10, Math.random() * 100)}%`,
                    width: "2%",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>CPU</span>
            <span>Memória</span>
            <span>Rede</span>
            <span>Disco</span>
          </div>
        </CardContent>
      </Card>

      {/* Status dos Sistemas e Alertas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status dos Sistemas</CardTitle>
            <CardDescription>Estado atual de todos os servidores e serviços</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemStatus.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(system.status)}`} />
                    <div>
                      <p className="font-medium">{system.name}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {system.uptime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{system.load}%</p>
                    <p className="text-xs text-muted-foreground">Load</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>Últimas notificações e eventos do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      alert.severity === "high"
                        ? "border-red-200 text-red-700"
                        : alert.severity === "medium"
                          ? "border-amber-200 text-amber-700"
                          : "border-blue-200 text-blue-700"
                    }
                  >
                    {alert.severity === "high" ? "Alto" : alert.severity === "medium" ? "Médio" : "Baixo"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ver todos os alertas
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Estatísticas de Rede */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Rede</CardTitle>
          <CardDescription>Tráfego e performance da rede nas últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-blue-600">1.2 TB</p>
              <p className="text-sm text-muted-foreground">Dados Transferidos</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-blue-500">45 ms</p>
              <p className="text-sm text-muted-foreground">Latência Média</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-blue-700">99.2%</p>
              <p className="text-sm text-muted-foreground">Disponibilidade</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente placeholder para Usuários
function UsuariosTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Usuários - ET & WICCA</CardTitle>
        <CardDescription>Gerencie usuários, permissões e acessos do sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="text-muted-foreground">
            <p>Seção de usuários em desenvolvimento.</p>
            <p className="text-sm mt-2">Em breve: criação, edição e gerenciamento de usuários e permissões.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente placeholder para Configurações
function ConfiguracoesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Sistema - ET & WICCA</CardTitle>
        <CardDescription>Configure parâmetros gerais do sistema e preferências.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="text-muted-foreground">
            <p>Seção de configurações em desenvolvimento.</p>
            <p className="text-sm mt-2">Em breve: configurações de sistema, backup, notificações e integrações.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
