# Guia de Desenvolvimento

Este guia descreve como configurar, desenvolver, testar e operar o projeto Day Guard AI localmente.

## Sumário
- Requisitos
- Setup inicial
- Estrutura do projeto
- Convenções de código
- Execução local
- Banco de dados e migrations
- Testes (unit e e2e)
- Observabilidade
- Swagger/OpenAPI
- Segurança
- Fluxo de contribuição
- Próximos passos

## Requisitos
- Node.js 22 LTS
- pnpm 9.x (ou npm 10.x)
- Docker + Docker Compose

Opcional:
- PostgreSQL 16/17 e Redis 7.x instalados localmente (se preferir não usar Docker)

## Setup inicial
1. Clone o repositório
   - `git clone https://github.com/seu-usuario/node-day-guard-ai.git`
   - `cd node-day-guard-ai`
2. Instale dependências na raiz do workspace (usa pnpm-workspace.yaml)
   - `pnpm install`
3. Copie variáveis de ambiente
   - `cp apps/api/.env.example apps/api/.env`
   - Se rodar API fora do Docker, mantenha DATABASE_URL com localhost
   - Se rodar API dentro do Docker, troque para host db (comentado no arquivo)
4. Suba os serviços auxiliares
   - `docker compose up -d`
5. Rode a API em dev
   - `pnpm dev:api` ou `cd apps/api && pnpm start:dev`

## Estrutura do projeto

O projeto segue uma arquitetura modular baseada em NestJS:

```
apps/api/src/
├── app.module.ts          # Módulo raiz da aplicação
├── main.ts                # Ponto de entrada da aplicação
├── app.controller.ts      # Controller principal
├── app.service.ts         # Serviço principal
├── common/                # Componentes compartilhados
│   ├── dto/               # DTOs compartilhados
│   ├── filters/           # Filtros de exceção globais
│   └── middleware/        # Middlewares globais
├── config/                # Configuração da aplicação
│   └── configuration.ts   # Configurações centralizadas
├── database/              # Configuração do banco de dados
│   ├── data-source.ts     # DataSource para TypeORM CLI
│   ├── database.module.ts # Módulo de database
│   └── migrations/        # Migrations TypeORM
├── health/                # Healthchecks
│   ├── health.controller.ts
│   └── health.module.ts
└── users/                 # Módulo de usuários
    ├── dto/               # DTOs específicos de usuários
    ├── entities/          # Entidades TypeORM
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
```

## Variáveis de ambiente
Crie um arquivo .env com as chaves abaixo (ajuste conforme necessário):

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/dayguard
LOG_LEVEL=info
CORS_ENABLED=true
CORS_ORIGIN=*
```

O módulo de configuração utiliza Joi para validação das variáveis de ambiente.

## Convenções de código
- TypeScript estrito (noImplicitAny, strictNullChecks)
- Padrão NestJS por módulos/domínios
- DTOs com class-validator/class-transformer
- ESLint + Prettier obrigatórios
- Commits semânticos: feat, fix, chore, docs, refactor, test, etc.

## Execução local
- Desenvolvimento: `pnpm dev:api` ou `cd apps/api && pnpm start:dev`
- Build e execução: `cd apps/api && pnpm build && pnpm start:prod`
- Lint/format: `cd apps/api && pnpm lint && pnpm format`

## Banco de dados e migrations
- Configuração TypeORM via data-source.ts para CLI
- TypeOrmConfigService para integração com NestJS
- Migration scripts disponíveis no package.json:
  - `cd apps/api && pnpm migration:generate --name=nome_da_migration`
  - `cd apps/api && pnpm migration:run`
  - `cd apps/api && pnpm migration:revert`

## Testes
- Unit: Jest + ts-jest
- e2e: supertest com app inicializada (TestingModule)
- Scripts no package.json:
  - `cd apps/api && pnpm test`
  - `cd apps/api && pnpm test:watch`
  - `cd apps/api && pnpm test:cov`
  - `cd apps/api && pnpm test:e2e`

## Observabilidade
- Healthcheck: GET /health (usando @nestjs/terminus)
- Logs: nestjs-pino (logs estruturados em JSON)
- RequestId middleware para correlação de logs

## Swagger/OpenAPI
- Documentação API disponível em: http://localhost:3000/docs
- Decorators do Swagger implementados nos DTOs e controllers
- Tags organizadas por domínio (health, users, etc.)

## Segurança
- Headers seguros
- CORS configurável
- Validação de input estrita com class-validator
- Autorização com JWT (em desenvolvimento)

## Fluxo de contribuição
1. Crie uma branch a partir de main: `git checkout -b feature/nome-da-feature`
2. Implemente as mudanças com commits semânticos
3. Atualize testes e documentação
4. Abra um PR com descrição detalhada
5. Após revisão e aprovação, faça merge para a branch main

## Próximos passos
- Implementar autenticação JWT completa
- Adicionar módulos para tarefas e lembretes
- Implementar serviço de resumo diário
- Configurar CI/CD
