/**
 * Configuração da aplicação seguindo boas práticas do NestJS
 * https://docs.nestjs.com/techniques/configuration
 */
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/dayguard',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  
  // Configurações adicionais
  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
    origin: process.env.CORS_ORIGIN ?? '*',
  },
  
  // Caminho para entidades e migrations para facilitar configuração
  paths: {
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
  }
}));
