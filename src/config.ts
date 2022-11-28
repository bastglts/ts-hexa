import dotenv from 'dotenv';

import { PostgresConfig } from './shared/adapters/driven/postgres-datasource';
import { ExpressConfig } from './shared/adapters/driving/express-web-server';
import { LoggerConfig, LogLevel } from './shared/ports/driven/logger.port';

dotenv.config();

interface Config {
  readonly logger: LoggerConfig;
  readonly express: ExpressConfig;
  readonly postgres: PostgresConfig;
}

export const config: Config = {
  logger: {
    level: (process.env.LOG_LEVEL ?? LogLevel.Info) as LogLevel,
  },
  express: {
    port: +(process.env.EXPRESS_SERVER_PORT ?? 3000),
    corsOrigin: process.env.EXPRESS_SERVER_CORS_ORIGIN ?? '*',
    hostname: process.env.EXPRESS_SERVER_HOSTNAME ?? 'localhost',
  },
  postgres: {
    host: process.env.POSTGRES_DATABASE_HOSTNAME ?? 'localhost',
    port: +(process.env.POSTGRES_DATABASE_PORT ?? 5432),
    username: process.env.POSTGRES_DATABASE_USER ?? 'docker',
    password: process.env.POSTGRES_DATABASE_PASSWORD ?? 'docker',
    database: process.env.POSTGRES_DATABASE_NAME ?? 'ts-hexa',
  },
};
