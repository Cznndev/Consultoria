# 📊 Gestão De Tecnologia

Um visualizador interativo de **diagramas de classe e arquitetura de sistemas**, desenvolvido com **Next.js**, **React**, **TypeScript** e estilizado com **TailwindCSS**. Este projeto permite visualizar, organizar e interagir com diagramas que representam os diferentes componentes de sistemas, como hardware, software, banco de dados e redes.

## 🚀 Funcionalidades

- 📜 **Visualização de diagramas dinâmicos** utilizando **Mermaid.js**.
- 🔍 **Zoom, pan e navegação nos diagramas** para melhor exploração.
- 🗂️ Organização dos diagramas em **abas contextuais**:
  - Hardware
  - Software
  - Banco de Dados
  - Redes
  - Consultoria
- 🌗 **Suporte completo a temas claro e escuro** usando Theme Provider.
- 🖼️ **Dashboard intuitivo**, com:
  - Menu lateral colapsável
  - Header com controles de tema, notificações e navegação.
- ⚡ **Sistema completo de notificações em tempo real**:
  - 🔔 **Centro de Notificações**:
    - Ícone no header com contador de não lidas
    - Dropdown com lista de notificações
    - Filtros (todas, não lidas, alta prioridade)
    - Categorização por tipo (hardware, software, rede, etc.)
    - Timestamps relativos (há 2min, 1h atrás, etc.)
    - Ações individuais (marcar como lida, excluir)
    - Configurações personalizáveis
  - ⚙️ **Sistema de Alertas Personalizáveis**:
    - Nova aba "Alertas" no dashboard
    - Criação de regras customizadas
    - Métricas como CPU, memória, disco, rede, etc.
    - Condições flexíveis (>, <, ==, etc.)
    - Níveis de severidade (baixa, média, alta, crítica)
    - Cooldown configurável
    - Suporte a múltiplos canais (email, push, SMS)
    - Estatísticas de disparos
  - 🍞 **Notificações Toast**:
    - Alertas em tempo real no canto da tela
    - Auto-dismiss configurável
    - Tipos visuais diferentes
    - Ações opcionais nos toasts
- ⚙️ Funcionalidades avançadas:
  - Simulação de notificações em tempo real
  - Persistência de configurações
  - Controle de acesso baseado em roles
  - Integração total com o sistema existente

## 🧠 Tecnologias utilizadas

- **Next.js** — Framework React full stack
- **React** — Biblioteca para construção de interfaces
- **TypeScript** — Tipagem estática para JavaScript
- **TailwindCSS** — Framework CSS utilitário
- **Mermaid.js** — Geração de diagramas a partir de código
- **Shadcn/ui** — Componentes UI acessíveis e personalizáveis
- **Radix UI** — Primitives para acessibilidade
- **Pnpm** — Gerenciador de pacotes rápido e eficiente
