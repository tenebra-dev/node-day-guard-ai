# Day Guard AI

Um assistente pessoal inteligente que usa IA generativa para gerenciar tarefas, lembretes e resumos diários com base no contexto do usuário (localização, horário, prioridades).

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

## Visão Geral

Day Guard AI é uma API backend construída em NestJS que oferece:
- Gerenciamento de tarefas e lembretes com contexto (hora/local/prioridade)
- Geração de resumos diários inteligentes com apoio de IA
- Integração com serviços externos (e-mail, calendário, mensageria)

## Estado Atual do Projeto

O projeto está na fase inicial de desenvolvimento com:

✅ **Configuração base**
- Scaffold NestJS com TypeScript
- Estrutura de monorepo com pnpm workspace
- Docker Compose para PostgreSQL
- TypeORM integrado com módulo de banco de dados
- Logging com nestjs-pino
- Healthchecks com @nestjs/terminus
- Configuração centralizada com @nestjs/config

✅ **Documentação**
- Swagger/OpenAPI implementado
- Versionamento de API

✅ **Módulos implementados**
- Users: CRUD completo de usuários
- Health: Monitoramento de saúde da aplicação

🚧 **Em desenvolvimento**
- Autenticação JWT
- Módulo de tarefas
- Módulo de lembretes

## Stack Tecnológica

- **Runtime**: Node.js 22 LTS
- **Linguagem**: TypeScript 5.x
- **Framework**: NestJS 10.x
- **ORM**: TypeORM 0.3.x
- **Banco de dados**: PostgreSQL 16
- **Documentação**: Swagger/OpenAPI
- **Validação**: class-validator/class-transformer
- **Logging**: nestjs-pino
- **Healthcheck**: @nestjs/terminus
- **Gerenciamento de pacotes**: pnpm

## Como começar

### Pré-requisitos

- Node.js 22 LTS
- pnpm 9.x (ou npm 10.x)
- Docker + Docker Compose

### Instalação e execução

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/node-day-guard-ai.git
cd node-day-guard-ai

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp apps/api/.env.example apps/api/.env

# Iniciar banco de dados com Docker
docker compose up -d

# Executar a aplicação em modo de desenvolvimento
pnpm dev:api
# ou
cd apps/api && pnpm start:dev
```

### Acessando a API

- **API**: http://localhost:3000/api
- **Documentação Swagger**: http://localhost:3000/docs
- **Healthcheck**: http://localhost:3000/health

## Estrutura do Projeto

```
node-day-guard-ai/
├── apps/
│   └── api/              # API NestJS
├── docs/                 # Documentação do projeto
└── package.json          # Configuração do monorepo
```

Para mais detalhes sobre a estrutura interna da API e guias de desenvolvimento, consulte o [Guia do Desenvolvedor](docs/README.dev.md).

## Arquitetura

- API modular (NestJS): controllers -> services -> repositories (TypeORM)
- Camadas de domínio por contexto (Users, Tasks, Reminders, Summaries)
- Config centralizada por ambiente com @nestjs/config e validação Joi
- Migrations com TypeORM
- Observabilidade: healthchecks, logs estruturados
- Padronização de erros com filtro global de exceções e correlação de requestId

## Features Atuais e Planejadas

### Implementado
- ✅ Usuários: CRUD completo
- ✅ Healthcheck e monitoramento
- ✅ Documentação Swagger/OpenAPI
- ✅ Versionamento de API

### Planejado
- 🚧 Autenticação JWT
- 🚧 Tarefas: CRUD, prioridade, due date, status
- 🚧 Lembretes: agendamento por horário
- 🚧 Resumo diário com IA

## Roadmap

- **Fase 0 — ✅ Fundações** (Concluída)
  - Scaffold NestJS, configuração
  - Docker Compose (PostgreSQL)
  - Módulos base: Config, Health, Logger, Database
  - Logging estruturado com correlação de requestId
  
- **Fase 1 — 🚧 Usuários e Autenticação** (Em andamento)
  - ✅ Módulo de usuários completo (CRUD)
  - ✅ Documentação OpenAPI, versionamento de API, tags
  - 🚧 Autenticação JWT, encriptação de senha
  
- **Fase 2 — Tarefas** (Planejada)
  - CRUD de tarefas, validações, migrations
  - Filtros e paginação
  
- **Fase 3 — Lembretes** (Planejada)
  - Agendamento via @nestjs/schedule
  - Regras de reenvio
  
- **Fase 4 — Resumo Diário** (Planejada)
  - Serviço de agregação e endpoint para disparo
  - Geração de resumo com IA

## Contribuindo

Contribuições são bem-vindas! Por favor, leia o [guia de desenvolvimento](docs/README.dev.md) para obter detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
