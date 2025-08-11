import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/dayguard',
  logLevel: process.env.LOG_LEVEL ?? 'info',
}));

export const envValidation = {
  NODE_ENV: ['development', 'test', 'production'],
  PORT: 'number',
  DATABASE_URL: 'string',
  LOG_LEVEL: ['fatal','error','warn','info','debug','trace','silent'],
};
