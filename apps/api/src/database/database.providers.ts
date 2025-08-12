/**
 * Provider de banco de dados para uso com injeção de dependência no NestJS
 * seguindo o padrão de Repository Pattern
 * 
 * Referência: https://docs.nestjs.com/recipes/sql-typeorm#getting-started
 */
import { DataSource } from 'typeorm';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: configService.get<string>('app.databaseUrl'),
        entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
        migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
        synchronize: configService.get('app.nodeEnv') === 'development',
        logging: configService.get('app.nodeEnv') === 'development',
        ssl: configService.get('app.nodeEnv') === 'production' 
          ? { rejectUnauthorized: false } 
          : false,
      });
      return dataSource.initialize();
    },
  },
];
