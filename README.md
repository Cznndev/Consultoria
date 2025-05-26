
# 📊 Class Diagram Viewer

Um visualizador interativo de diagramas de classe, desenvolvido com **Next.js**, **React**, **TypeScript** e estilizado com **TailwindCSS**. Este projeto permite visualizar e interagir com diagramas representando diferentes componentes de sistemas, como hardware, software, banco de dados e redes.

## 🚀 Funcionalidades

- 📜 Visualização de diagramas de classe usando **Mermaid.js**.
- 🔥 Interface moderna e responsiva utilizando **TailwindCSS**.
- 🌗 Suporte a temas (claro e escuro) com **Theme Provider**.
- 🧠 Organização dos diagramas em abas por contexto:
  - Hardware
  - Software
  - Banco de Dados
  - Rede
- 🗺️ Navegação intuitiva com cabeçalho, barra lateral e dashboard.

## 🧠 Tecnologias utilizadas

- **Next.js** — Framework React full stack
- **React** — Biblioteca para construção de interfaces
- **TypeScript** — Tipagem estática para JavaScript
- **TailwindCSS** — Framework CSS utilitário
- **Mermaid.js** — Geração de diagramas e gráficos a partir de texto
- **Shadcn/ui** — Componentes UI acessíveis e personalizáveis
- **Radix UI** — Acessibilidade e primitives
- **pnpm** — Gerenciador de pacotes rápido e eficiente

## 📁 Estrutura de pastas

```
/
├── app/                # Páginas principais (Next.js routing)
│   ├── dashboard/      # Página do dashboard
│   ├── layout.tsx      # Layout base
│   └── page.tsx        # Página inicial
├── components/         # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (botões, cards, etc.)
│   ├── dashboard/      # Componentes específicos do dashboard
│   ├── tabs/           # Abas de visualização (hardware, software, etc.)
│   └── mermaid.tsx     # Componente de visualização de diagramas
├── hooks/              # Hooks personalizados
├── public/             # Arquivos públicos (imagens, ícones)
├── styles/             # Arquivos de estilo global
├── package.json        # Dependências e scripts
├── tailwind.config.ts  # Configuração do Tailwind
└── tsconfig.json       # Configuração do TypeScript
```
