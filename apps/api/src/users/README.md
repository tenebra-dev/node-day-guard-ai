# Módulo de Usuários

Este módulo implementa funcionalidades relacionadas ao gerenciamento de usuários no sistema Day Guard AI.

## Funcionalidades

- Cadastro de usuários
- Consulta de usuários (por ID, e-mail ou lista completa)
- Atualização de dados de usuários
- Remoção de usuários (física ou lógica/desativação)
- Filtro de usuários ativos

## Estrutura

```
users/
├── dto/                   # Data Transfer Objects
│   ├── create-user.dto.ts # DTO para criação de usuário
│   └── update-user.dto.ts # DTO para atualização de usuário
├── entities/
│   └── user.entity.ts     # Entidade TypeORM de usuário
├── users.controller.ts    # Controller REST com endpoints
├── users.module.ts        # Módulo NestJS
└── users.service.ts       # Serviço com lógica de negócio
```

## API REST

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users` | Lista todos os usuários |
| GET | `/users/active` | Lista usuários ativos |
| GET | `/users/:id` | Obtém um usuário pelo ID |
| GET | `/users/:id/active` | Obtém um usuário ativo pelo ID |
| GET | `/users/email/:email` | Busca usuário por e-mail |
| POST | `/users` | Cria um novo usuário |
| PATCH | `/users/:id` | Atualiza dados do usuário |
| PATCH | `/users/:id/deactivate` | Desativa um usuário (soft delete) |
| DELETE | `/users/:id` | Remove um usuário permanentemente |

## Modelo de Dados

```typescript
// user.entity.ts
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

## Implementação

O módulo utiliza o padrão Repository do TypeORM com injeção de dependência do NestJS. O serviço `UsersService` encapsula toda a lógica de negócio e validações, enquanto o controller `UsersController` expõe os endpoints REST.

## Próximos Passos

- Implementar hash de senha com bcrypt
- Adicionar validações mais robustas
- Implementar perfis de usuário (roles)
- Adicionar paginação e filtros avançados
