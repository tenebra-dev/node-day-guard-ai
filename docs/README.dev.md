# Guia de Desenvolvimento

Este guia descreve como configurar, desenvolver, testar e operar o projeto localmente.

## Sumário
- Requisitos
- Setup inicial
- Convenções de código
- Execução local
- Banco de dados e migrations
- Testes (unit e e2e)
- Observabilidade
- Boas práticas de segurança
- Fluxo de contribuição
- Próximos passos

## Requisitos
- Node.js 22 LTS
- pnpm 9.x (ou npm 10.x)
- Docker + Docker Compose

Opcional:
- PostgreSQL 16/17 e Redis 7.x instalados localmente (se preferir não usar Docker)

## Setup inicial
1. Instale dependências na raiz do workspace (usa pnpm-workspace.yaml)
   - pnpm install
2. Copie variáveis de ambiente
   - cp apps/api/.env.example apps/api/.env
   - Se rodar API fora do Docker, mantenha DATABASE_URL com localhost
   - Se rodar API dentro do Docker, troque para host db (comentado no arquivo)
3. Suba os serviços auxiliares
   - docker compose up -d
4. Rode a API em dev
   - pnpm dev:api

## Variáveis de ambiente (proposta)
Crie um arquivo .env com as chaves abaixo (ajuste conforme necessário):

- NODE_ENV=development
- PORT=3000
- DATABASE_URL=postgres://postgres:postgres@db:5432/dayguard
- REDIS_URL=redis://localhost:6379
- JWT_SECRET=change_me
- OPENAI_API_KEY=(opcional)

Sugestão: validar config com joi/zod no módulo de configuração.

## Convenções de código
- TypeScript estrito (noImplicitAny, strictNullChecks)
- Padrão NestJS por módulos/domínios
- DTOs com class-validator/class-transformer
- ESLint + Prettier obrigatórios (CI falha se não cumprir)
- Commits semânticos (conventional commits): feat, fix, chore, docs, refactor, test, perf, ci, build, style

## Execução local
- Desenvolvimento: pnpm dev:api
- Produção local (build): pnpm build && pnpm start:prod
- Lint/format: pnpm lint && pnpm format

## Banco de dados e migrations
- Configuração TypeORM via data-source.ts ou config do Nest (@nestjs/typeorm)
- Migrations versionadas em src/database/migrations
- Seeds opcionais em src/database/seeds
- Data source: apps/api/src/database/data-source.ts
- Scripts úteis:
  - pnpm migration:generate --name=create_tasks
  - pnpm migration:run
  - pnpm migration:revert

## Testes
- Unit: Jest + ts-jest
- e2e: supertest com app inicializada (TestingModule)
- Cobertura: pnpm test:cov (alvo mínimo recomendado: 80%)

## Observabilidade
- Healthcheck: GET /health (Terminus) — depende da conexão com Postgres
- Logs: pino + nestjs-pino (JSON), correlação de requestId
- Métricas/Tracing: OpenTelemetry com export OTLP (Prometheus/Tempo)

## Segurança
- Headers seguros (helmet)
- Rate limiting (@nestjs/throttler)
- CORS configurado
- Senhas com bcrypt, JWT com expiração e refresh token (fase pós-MVP)
- Validação de input estrita, whitelist e forbidNonWhitelisted

## Fluxo de contribuição
1. Crie uma branch a partir de main
2. Faça commits pequenos e objetivos
3. Atualize testes e docs
4. Abra PR com descrição, checklist e screenshots/logs quando aplicável
5. Aguarde revisão e squash merge

## Próximos passos
- Implementar Entities e Migrations iniciais
- Adicionar Swagger e versionamento
- Configurar CI básico
