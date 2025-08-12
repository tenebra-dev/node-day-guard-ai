import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm-config.service';
import { databaseProviders } from './database.providers';

/**
 * Módulo de banco de dados seguindo boas práticas do NestJS
 * Implementa duas abordagens:
 * 1. Usando TypeOrmModule.forRootAsync com ConfigService (recomendado para aplicações mais simples)
 * 2. Usando providers customizados para maior controle (recomendado para aplicações complexas)
 * 
 * Referências:
 * - https://docs.nestjs.com/techniques/database#typeorm-integration
 * - https://docs.nestjs.com/recipes/sql-typeorm#getting-started
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [
    ...databaseProviders,
    TypeOrmConfigService,
  ],
  exports: [
    ...databaseProviders,
    TypeOrmConfigService,
  ],
})
export class DatabaseModule {}
