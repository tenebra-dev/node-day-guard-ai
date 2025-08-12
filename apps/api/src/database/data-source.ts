/**
 * DataSource para uso com migrações e CLI do TypeORM
 * Documentação: https://typeorm.io/data-source
 */
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: join(__dirname, '../../../.env') });

// Configurações do DataSource
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/dayguard',
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  synchronize: false, // Sempre mantenha como false em produção
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
};

// Instância do DataSource para uso com CLI
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
