import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

/**
 * Factory de configuração do TypeORM para o NestJS seguindo boas práticas
 * da documentação: https://docs.nestjs.com/techniques/database#typeorm-integration
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('app.databaseUrl'),
      entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
      synchronize: false, // Desabilitado em produção por segurança
      logging: this.configService.get('app.nodeEnv') === 'development',
      // SSL configuration para ambientes de produção
      ssl: this.configService.get('app.nodeEnv') === 'production' 
        ? { rejectUnauthorized: false } 
        : false,
    };
  }
}
