
# Client Hub - Customer Registration System

Aplicação full stack robusta e escalável para cadastro e gerenciamento de clientes, desenvolvida como solução para teste técnico. Sistema completo com autenticação de dados, validação em múltiplas camadas e infraestrutura containerizada.

---

## 📋 Caso de Uso

O projeto foi desenvolvido com base no seguinte requisito de negócio:

> Cliente necessita de uma plataforma para cadastrar informações de seus clientes em um banco de dados robusto. A aplicação deve coletar: nome completo, CPF, e-mail, cor preferida (arco-íris) e observações. Cada cliente deve ser cadastrado uma única vez, com feedback visual de sucesso ou erro. A solução deve ser containerizada com Docker para deployment em serviço terceirizado.

---

## 🎯 Requisitos Implementados

✅ **Formulário Web** - Interface amigável e responsiva com React  
✅ **Validação de Dados** - Validação em cliente (Zod) e servidor (Prisma)  
✅ **Banco de Dados Robusto** - PostgreSQL com migrations automáticas  
✅ **API REST** - Backend em Node.js com tipagem TypeScript  
✅ **Docker & Compose** - Infraestrutura containerizada completa  
✅ **Unicidade de CPF** - Prevenção de cadastros duplicados  
✅ **Feedback Visual** - Mensagens de sucesso e erro em tempo real  
✅ **Type-Safe** - TypeScript em toda a aplicação (100% tipado)

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - UI library moderno e performático
- **TypeScript** - Type safety e melhor DX
- **Vite** - Build tool ultra-rápido com HMR
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação de schemas (client-side)
- **CSS3** - Estilização com design responsivo

### Backend
- **Node.js** - Runtime JavaScript server-side
- **Express.js** - Framework web minimalista e robusto
- **TypeScript** - Type safety e autocomplete
- **Prisma ORM** - Type-safe database access layer
- **Zod** - Validação de entrada (schemas compartilhados)
- **CORS** - Controle de origem cruzada

### Banco de Dados
- **PostgreSQL 16** - RDBMS robusto e confiável
- **Prisma Migrations** - Versionamento de schema automático

### Infraestrutura
- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração multi-container (app + banco)
- **.env** - Configuração de ambiente

---

## 📁 Estrutura do Projeto

```
client-hub/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Configuração Express
│   │   ├── server.ts              # Entry point
│   │   ├── controllers/           # Request handlers
│   │   ├── services/              # Lógica de negócio
│   │   ├── routes/                # Definição de rotas
│   │   ├── schemas/               # Validação Zod
│   │   ├── types/                 # Type definitions
│   │   ├── lib/                   # Utilitários (prisma client)
│   │   └── generated/             # Tipos gerados pelo Prisma
│   ├── prisma/
│   │   ├── schema.prisma          # Modelo de dados
│   │   └── migrations/            # Histórico de migrações
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   ├── services/              # API client
│   │   ├── schemas/               # Validação Zod
│   │   ├── types/                 # TypeScript types
│   │   ├── constants/             # Constantes (cores, etc)
│   │   ├── main.tsx               # Entry point
│   │   └── App.tsx                # Componente raiz
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── docker-compose.yml             # Orquestração containers
└── README.md                       # Este arquivo
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ e npm
- Docker e Docker Compose
- PostgreSQL (ou use Docker para evitar instalação local)

### Opção 1: Com Docker Compose (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/TatianaOnishi/client-hub.git
cd client-hub

# Inicie os serviços
docker-compose up --build

# A aplicação estará disponível em:
# Frontend: http://localhost:5173
# Backend:  http://localhost:3333
```

### Opção 2: Instalação Local

**Backend:**
```bash
cd backend
npm install
npm run prisma:migrate  # Criar/migrar banco de dados
npm run dev             # Inicia em http://localhost:3333
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev             # Inicia em http://localhost:5173
```

---

## 📊 Modelo de Dados

### Tabela: Customer
```sql
CREATE TABLE "Customer" (
  id        String    @id @default(cuid())
  fullName  String
  cpf       String    @unique          -- Validação de unicidade
  email     String
  favoriteColor String
  observations String
  createdAt DateTime  @default(now())
)
```

---

## 🔄 Fluxo de Dados

```
Frontend (React)
    ↓
    └─→ Validação Zod (Client-side)
    ↓
[Formulário Preenchido]
    ↓
    └─→ POST /customers (API)
    ↓
Backend (Express + Prisma)
    ↓
    └─→ Validação Zod (Server-side)
    └─→ Verificar CPF duplicado
    └─→ Validar regras de negócio
    ↓
PostgreSQL
    ↓
    └─→ INSERT Customer
    ↓
[Resposta 201/400]
    ↓
Frontend
    ↓
    └─→ Mensagem de Sucesso/Erro
```

---

## 🛡️ Validações Implementadas

### Client-Side (React + Zod)
- Campo obrigatório
- Formato de email válido
- Seleção de cor do arco-íris
- Observações opcionais

### Server-Side (Express + Prisma)
- Validação de schema novamente
- Verificação de CPF duplicado com erro descritivo
- Type-checking via TypeScript

---

## 📦 Scripts Disponíveis

### Backend
```bash
npm run dev              # Inicia em modo desenvolvimento
npm run build            # Build para produção
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Interface visual do Prisma
```

### Frontend
```bash
npm run dev              # Inicia Vite dev server
npm run build            # Build otimizado
npm run preview          # Preview do build
```

---

## 🎨 Features

- ✨ **Formulário Reativo** - Atualização em tempo real com validação
- 🌈 **Seletor de Cores** - Preview visual da cor selecionada
- ✅ **Feedback Imediato** - Mensagens de sucesso/erro inline
- 📱 **Responsivo** - Design mobile-first
- ♿ **Acessível** - Semântica HTML apropriada
- 🔒 **Type-Safe** - Zero any types

---

## 🏗️ Arquitetura & Decisões Técnicas

### Por que Prisma?
- Type-safe database access
- Migrations automáticas versionadas
- Geração de tipos TypeScript
- Interface visual (Prisma Studio)
- Fácil manutenção futura

### Por que Zod?
- Validação em schema único (client + server)
- Type inference automático
- Mensagens de erro customizáveis
- Lightweight (~8KB)

### Por que Vite?
- Build ultra-rápido (~100ms)
- Hot Module Replacement (HMR) instantâneo
- Menor bundle size que Create React App
- Melhor DX para desenvolvimento

### Por que Docker?
- Ambiente reproduzível em qualquer máquina
- Fácil deployment em clouds (AWS, DigitalOcean, etc)
- Isolamento entre serviços (app + banco)
- Production-ready

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `backend/`:

```env
DATABASE_URL="postgresql://user:password@db:5432/client_hub"
PORT=3333
NODE_ENV=development
```

---

## 📈 Próximas Melhorias (Para Equipe Futura)

- 🔐 Autenticação e autorização (JWT/OAuth)
- 📊 Dashboard com estatísticas
- 🔍 Busca e filtro de clientes
- 📝 Edição e deleção de registros
- 🔔 Notificações por email
- 📱 Progressive Web App (PWA)
- 🧪 Testes unitários e E2E
- 📚 Documentação de API (Swagger)
- 🚀 CI/CD pipeline (GitHub Actions)
- 📊 Observabilidade (logs, metrics)

---

## 👨‍💼 Decisões de Design

### Segurança
- Validação em múltiplas camadas
- Unicidade de CPF no banco (constraint)
- CORS configurado
- Prepared statements via Prisma (SQL injection safe)

### Escalabilidade
- Separação clara de concerns (controllers, services)
- Fácil adicionar novos endpoints
- Modelo de dados extensível
- Pronto para autenticação e autorização

### Manutenibilidade
- TypeScript em 100% do código
- Estrutura de pastas clara
- Schemas únicos (Zod) para validação
- Tipos gerados automaticamente (Prisma)

---

## 📝 Licença

Este projeto foi desenvolvido como teste técnico.

---

## ✉️ Contato

Dúvidas sobre a implementação? Abra uma issue ou entre em contato.

---

**Desenvolvido com ❤️ em TypeScript, React e Node.js**
