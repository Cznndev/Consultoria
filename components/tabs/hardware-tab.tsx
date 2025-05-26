"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Laptop, Printer, Server, Smartphone, Trash2, Edit, Plus, Search, Download, Filter } from "lucide-react"

// Dados de exemplo
const hardwareData = [
  {
    id: 1,
    tipo: "Laptop",
    modelo: "Dell XPS 15",
    serial: "XPS159876",
    status: "Ativo",
    departamento: "TI",
    aquisicao: "15/03/2023",
  },
  {
    id: 2,
    tipo: "Desktop",
    modelo: "HP EliteDesk 800",
    serial: "ELT8001234",
    status: "Ativo",
    departamento: "Financeiro",
    aquisicao: "10/01/2023",
  },
  {
    id: 3,
    tipo: "Servidor",
    modelo: "Dell PowerEdge R740",
    serial: "PE7405678",
    status: "Manutenção",
    departamento: "TI",
    aquisicao: "05/11/2022",
  },
  {
    id: 4,
    tipo: "Impressora",
    modelo: "HP LaserJet Pro",
    serial: "LJP2022",
    status: "Ativo",
    departamento: "RH",
    aquisicao: "20/06/2023",
  },
  {
    id: 5,
    tipo: "Smartphone",
    modelo: "Samsung Galaxy S22",
    serial: "SGS22987",
    status: "Ativo",
    departamento: "Diretoria",
    aquisicao: "12/04/2023",
  },
  {
    id: 6,
    tipo: "Tablet",
    modelo: "iPad Pro 12.9",
    serial: "IPP129456",
    status: "Inativo",
    departamento: "Vendas",
    aquisicao: "08/02/2023",
  },
  {
    id: 7,
    tipo: "Monitor",
    modelo: "Dell UltraSharp 27",
    serial: "US27654",
    status: "Ativo",
    departamento: "Design",
    aquisicao: "17/05/2023",
  },
  {
    id: 8,
    tipo: "Laptop",
    modelo: "MacBook Pro 16",
    serial: "MBP16789",
    status: "Ativo",
    departamento: "Marketing",
    aquisicao: "22/07/2023",
  },
]

export function HardwareTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [openDialog, setOpenDialog] = useState(false)

  // Filtrar dados com base na pesquisa e filtro
  const filteredData = hardwareData.filter((item) => {
    const matchesSearch =
      item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.departamento.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || item.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Função para renderizar o ícone com base no tipo
  const renderIcon = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "laptop":
        return <Laptop className="h-4 w-4" />
      case "servidor":
        return <Server className="h-4 w-4" />
      case "smartphone":
      case "tablet":
        return <Smartphone className="h-4 w-4" />
      case "impressora":
        return <Printer className="h-4 w-4" />
      default:
        return <Laptop className="h-4 w-4" />
    }
  }

  // Função para renderizar o badge de status
  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "ativo":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Ativo
          </Badge>
        )
      case "inativo":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Inativo
          </Badge>
        )
      case "manutenção":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Manutenção
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Gerenciamento de Hardware</CardTitle>
          <CardDescription>Gerencie todos os equipamentos físicos da sua organização.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por modelo, serial ou departamento..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="manutenção">Manutenção</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Hardware
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Hardware</DialogTitle>
                    <DialogDescription>Preencha os detalhes do novo equipamento.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tipo" className="text-right">
                        Tipo
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laptop">Laptop</SelectItem>
                          <SelectItem value="desktop">Desktop</SelectItem>
                          <SelectItem value="servidor">Servidor</SelectItem>
                          <SelectItem value="impressora">Impressora</SelectItem>
                          <SelectItem value="smartphone">Smartphone</SelectItem>
                          <SelectItem value="tablet">Tablet</SelectItem>
                          <SelectItem value="monitor">Monitor</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="modelo" className="text-right">
                        Modelo
                      </Label>
                      <Input id="modelo" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="serial" className="text-right">
                        Nº Serial
                      </Label>
                      <Input id="serial" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="departamento" className="text-right">
                        Departamento
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ti">TI</SelectItem>
                          <SelectItem value="financeiro">Financeiro</SelectItem>
                          <SelectItem value="rh">RH</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="diretoria">Diretoria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="aquisicao" className="text-right">
                        Data Aquisição
                      </Label>
                      <Input id="aquisicao" type="date" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Nº Serial</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Data Aquisição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {renderIcon(item.tipo)}
                        {item.tipo}
                      </div>
                    </TableCell>
                    <TableCell>{item.modelo}</TableCell>
                    <TableCell>{item.serial}</TableCell>
                    <TableCell>{renderStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.departamento}</TableCell>
                    <TableCell>{item.aquisicao}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredData.length} de {hardwareData.length} itens
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-primary" />
                  <span className="text-sm">Laptops/Desktops</span>
                </div>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span className="text-sm">Servidores</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-sm">Dispositivos Móveis</span>
                </div>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4 text-primary" />
                  <span className="text-sm">Outros</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Status dos Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ativos</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">85%</span>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Inativos</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">8%</span>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gray-500 w-[8%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Em Manutenção</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">7%</span>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-amber-500 w-[7%]" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Manutenções Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Server className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Servidor Dell PowerEdge</p>
                  <p className="text-xs text-muted-foreground">Amanhã, 10:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Printer className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Impressora HP LaserJet</p>
                  <p className="text-xs text-muted-foreground">18/05, 14:30</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-xs">
              Ver todas as manutenções
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
