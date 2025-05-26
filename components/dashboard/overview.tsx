"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Laptop,
  Server,
  Smartphone,
  Building2,
  TrendingUp,
  DollarSign,
} from "lucide-react"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Fev",
    total: 15,
  },
  {
    name: "Mar",
    total: 18,
  },
  {
    name: "Abr",
    total: 14,
  },
  {
    name: "Mai",
    total: 22,
  },
  {
    name: "Jun",
    total: 26,
  },
]

export function Overview() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("et-wicca-user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) return null

  // Cards para Administrador e TI
  const TechnicalCards = () => (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Hardware</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground">+5 no último mês</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Licenças de Software</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">84</div>
          <p className="text-xs text-muted-foreground">3 a vencer em 30 dias</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dispositivos de Rede</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">98.5% online</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bancos de Dados</CardTitle>
          <Laptop className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Último backup: 2h atrás</p>
        </CardContent>
      </Card>
    </>
  )

  // Cards para Gestor
  const ManagerCards = () => (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Disponibilidade Geral</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">99.2%</div>
          <p className="text-xs text-muted-foreground">Uptime dos sistemas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Custo Mensal TI</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 45.2K</div>
          <p className="text-xs text-muted-foreground">-2.1% vs mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Incidentes Resolvidos</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98%</div>
          <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfação Usuários</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.7/5</div>
          <p className="text-xs text-muted-foreground">Avaliação do suporte TI</p>
        </CardContent>
      </Card>
    </>
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {user.role === "gestor" ? <ManagerCards /> : <TechnicalCards />}

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>
            {user.role === "gestor" ? "Investimentos em TI - ET & WICCA" : "Aquisições Mensais - ET & WICCA"}
          </CardTitle>
          <CardDescription>
            {user.role === "gestor"
              ? "Investimentos em tecnologia nos últimos 6 meses (em milhares de reais)."
              : "Número de novos equipamentos adquiridos nos últimos 6 meses."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => (user.role === "gestor" ? `R$ ${value}K` : `${value}`)}
              />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alertas - diferentes para cada tipo de usuário */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {user.role === "gestor" ? "Resumo Executivo - ET & WICCA" : "Alertas Recentes - Sistema ET & WICCA"}
          </CardTitle>
          <CardDescription>
            {user.role === "gestor"
              ? "Principais indicadores e status dos sistemas."
              : "Últimos alertas do sistema de monitoramento."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.role === "gestor" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Todos os sistemas operacionais</p>
                  <p className="text-sm text-muted-foreground">99.2% de disponibilidade no mês</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Economia de custos alcançada</p>
                  <p className="text-sm text-muted-foreground">Redução de 2.1% nos custos mensais</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">3 licenças a vencer</p>
                  <p className="text-sm text-muted-foreground">Renovação necessária nos próximos 30 dias</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Servidor DB-02 com alto uso de CPU</p>
                  <p className="text-sm text-muted-foreground">Uso de CPU acima de 90% por mais de 15 minutos</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>12min</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Backup completo do servidor de arquivos</p>
                  <p className="text-sm text-muted-foreground">Backup concluído com sucesso em 45 minutos</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>1h</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Switch SW-04 offline</p>
                  <p className="text-sm text-muted-foreground">Dispositivo não responde há 5 minutos</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>2h</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {user.role === "gestor" ? "Ver relatório completo" : "Ver todos os alertas"}
          </Button>
        </CardFooter>
      </Card>

      {/* Card de distribuição - adaptado para cada usuário */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {user.role === "gestor"
              ? "Indicadores de Performance - ET & WICCA"
              : "Distribuição de Hardware - ET & WICCA"}
          </CardTitle>
          <CardDescription>
            {user.role === "gestor"
              ? "Principais KPIs de tecnologia da empresa."
              : "Tipos de dispositivos no inventário da empresa."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.role === "gestor" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-bold">99.2%</h3>
                <p className="text-xs text-muted-foreground">Disponibilidade</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <DollarSign className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-bold">R$ 45K</h3>
                <p className="text-xs text-muted-foreground">Custo Mensal</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-bold">98%</h3>
                <p className="text-xs text-muted-foreground">Incidentes Resolvidos</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <Building2 className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">4.7/5</h3>
                <p className="text-xs text-muted-foreground">Satisfação</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <Laptop className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">68</h3>
                <p className="text-xs text-muted-foreground">Desktops/Laptops</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <Server className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">12</h3>
                <p className="text-xs text-muted-foreground">Servidores</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <Smartphone className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">35</h3>
                <p className="text-xs text-muted-foreground">Dispositivos Móveis</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                <Building2 className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">12</h3>
                <p className="text-xs text-muted-foreground">Outros</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {user.role === "gestor" ? "Ver dashboard executivo" : "Ver inventário completo"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
