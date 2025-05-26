"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Building2, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular autenticação (em produção, isso seria uma chamada para API)
    setTimeout(() => {
      if (email && password) {
        // Definir role baseado no email/senha
        let role = "gestor"
        let name = "Usuário ET & WICCA"

        if (email === "admin@etwicca.com" && password === "admin123") {
          role = "admin"
          name = "Administrador ET & WICCA"
        } else if (email === "ti@etwicca.com" && password === "ti123") {
          role = "ti"
          name = "Técnico TI ET & WICCA"
        } else if (email === "gestor@etwicca.com" && password === "gestor123") {
          role = "gestor"
          name = "Gestor ET & WICCA"
        }

        // Salvar token de autenticação no localStorage
        localStorage.setItem("et-wicca-auth", "authenticated")
        localStorage.setItem(
          "et-wicca-user",
          JSON.stringify({
            name: name,
            email: email,
            role: role,
          }),
        )
        router.push("/dashboard")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">ET & WICCA</h1>
              <p className="text-xs text-muted-foreground">Sistema de Gestão de TI</p>
            </div>
          </div>
          <CardTitle className="text-xl">Acesso Restrito</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o sistema interno da empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@etwicca.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar no Sistema"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Credenciais de Demonstração</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Admin:</strong> admin@etwicca.com / admin123
              </p>
              <p>
                <strong>TI:</strong> ti@etwicca.com / ti123
              </p>
              <p>
                <strong>Gestor:</strong> gestor@etwicca.com / gestor123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
