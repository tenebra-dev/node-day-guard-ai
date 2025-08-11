# node-day-guard-ai

Um assistente pessoal inteligente que usa MCP (Model Context Protocol) e IA generativa para gerenciar tarefas, lembretes e resumos diários com base no contexto do usuário (localização, horário, prioridades).

## Visão Geral

Este repositório hospedará uma API backend construída em NestJS focada em:
- Gerenciar tarefas e lembretes com contexto (hora/local/prioridade)
- Gerar um resumo diário inteligente com apoio de IA
- Integrar-se a serviços externos (e-mail, calendário, mensageria) de forma segura e observável

Para maximizar robustez e suporte, prioriza-se integrações nativas e amplamente documentadas do ecossistema NestJS (ex.: TypeORM + PostgreSQL).

## Stack de Tecnologia (recomendada)

- Runtime: Node.js 22 LTS
- Linguagem: TypeScript >= 5.9
- Framework: NestJS 10.x (CLI incluso)
- ORM: TypeORM 0.3.x + @nestjs/typeorm
- Banco de dados: PostgreSQL 16 ou 17
- Cache e Filas: Redis 7.x (+ @nestjs/bullmq para filas com BullMQ)
- Configuração: @nestjs/config 3.x + dotenv 16.x
- Validação: class-validator 0.14.x + class-transformer 0.5.x
- Autenticação/Autorização: @nestjs/passport + passport-jwt + bcrypt
- Rate limiting: @nestjs/throttler 5.x
- Documentação da API: @nestjs/swagger 7.x + swagger-ui-express
- Observabilidade e Saúde: nestjs/terminus 10.x, OpenTelemetry (SDK 1.x + OTLP)
- Logger: pino 9.x + nestjs-pino 4.x
- Testes: Jest 29/30 + ts-jest + supertest
- Qualidade de código: ESLint 9.x, Prettier 3.x, EditorConfig
- Empacotamento/PM: pnpm 9.x (ou npm 10.x)
- Infraestrutura de desenvolvimento: Docker + Docker Compose
- IA (opcional no MVP): OpenAI SDK (>= 4.x) / conector abstrato para provedores

Observação: versões podem evoluir; priorize sempre releases estáveis/LTS.

## Clientes Web e Mobile (proposta)

- Web: Next.js 14.2.x, React 18.2, TypeScript 5.9, App Router, TanStack Query 5, Tailwind CSS 3.x, shadcn/ui, Zod, Axios/Fetch. 
- Mobile: React Native 0.75.x (via Expo SDK 51/52), React Query, React Navigation 7, Expo Router, MMKV para storage.
- Monorepo recomendado com pnpm workspaces + Turborepo, com pacotes: apps/web (Next), apps/mobile (Expo), apps/api (Nest), packages/eslint-config, packages/tsconfig, packages/ui (opcional), packages/api-sdk (gerado via OpenAPI).
- Geração de SDK TypeScript a partir do OpenAPI do backend (openapi-typescript ou orval) para web/mobile.

## Arquitetura (alto nível)

- API modular (NestJS): controllers -> services -> repositories (TypeORM)
- Camadas de domínio por contexto (Tasks, Reminders, Users/Auth, Summaries)
- Agendamentos: @nestjs/schedule + BullMQ para jobs e reprocessamentos
- Config centralizada por ambiente com @nestjs/config
- Migrations e seed com TypeORM
- Observabilidade: healthchecks, métricas, tracing, logs estruturados
- Padronização de erros: Problem Details (RFC 9457) com filtro global de exceções e correlação de requestId

## MVP — Funcionalidades

- Usuários e autenticação (JWT)
- Tarefas: CRUD, prioridade, due date, status
- Lembretes: agendamento por horário (e janela), opcionalmente por localização
- Resumo diário: gerado a partir de tarefas/prioridades; endpoint para disparo manual
- Documentação Swagger básica
- Healthcheck, métricas e logs estruturados

Fora do escopo do MVP: integrações externas (calendário/assistentes), notificações multicanal, ACL avançada, preferências avançadas.

## Roadmap (sugestão)

- Fase 0 — Fundações
  - Scaffold NestJS, configuração ESLint/Prettier/EditorConfig
  - Docker Compose (Postgres, Redis) e variáveis de ambiente
  - Módulos base: Config, Health, Logger, Database
  - Padronização de erros e logging: filtro global (Problem Details), requestId, logs estruturados
- Fase 1 — Usuários e Autenticação
  - Users + Auth (JWT), encriptação de senha
  - Documentação OpenAPI completa, versionamento de API, tags, exemplos
  - Geração de SDK TypeScript para clientes (web/mobile) a partir do OpenAPI
- Fase 2 — Tarefas (Core)
  - CRUD de tarefas, validações, migrations e seed inicial
  - Filtros e paginação
- Fase 3 — Lembretes
  - Agendamento via @nestjs/schedule + filas BullMQ
  - Regras de reenvio e backoff
- Fase 4 — Resumo Diário
  - Serviço de agregação e endpoint para disparo
  - Geração de resumo com regra determinística e, opcionalmente, IA
- Fase 5 — Observabilidade e Robustez
  - Métricas/tracing (OTel), dashboards, alertas
  - Rate limiting, hardening de segurança, auditoria
  - Padrão Outbox para envio de eventos e resiliência
- Fase 6 — Extensões (Pós-MVP)
  - Integrações com calendário/e-mail
  - Notificações (e-mail, push, mensageria)
  - MCP/LLM providers plugáveis
- Fase 7 — Arquitetura Evolutiva
  - Introdução de CQRS e Event Sourcing (prova de conceito)
  - Avaliar EventStoreDB ou Postgres como event store; replays e projeções

## Estrutura de Pastas (proposta)

- src/
  - app.module.ts
  - common/ (filtros, pipes, interceptors, dto base)
  - config/ (schemas e loaders)
  - database/ (typeorm config, migrations, seed)
  - modules/
    - auth/
    - users/
    - tasks/
    - reminders/
    - summaries/
    - health/
- test/ (unit e e2e)
- docs/ (guias, ADRs, diagramas)

## Scripts (planejados)

- dev: executar Nest em watch mode
- build: build TypeScript
- start: produção
- test, test:watch, test:e2e, test:cov
- lint, format
- migration:generate, migration:run, migration:revert

Os scripts exatos serão definidos quando o scaffold for criado.

## Requisitos

- Node.js 22 LTS
- pnpm 9.x (ou npm 10.x)
- Docker + Docker Compose
- PostgreSQL 16/17 e Redis 7.x (se não usar Docker)

## Como começar

1) Verifique os requisitos (Node 22, pnpm, Docker)  
2) Leia o guia de desenvolvimento em docs/README.dev.md  
3) Após o scaffold, rode: instalação de deps, containers (Postgres/Redis), migrations e start:dev

## Licença

A definir.
