import 'reflect-metadata';

import { container } from './di-container';
import { ExpressWebServer } from './shared/adapters/in/express-web-server';
import { PostgresDataSource } from './shared/adapters/out/postgres-datasource';
import { LOGGER, LoggerPort } from './shared/ports/out/logger.port';

const logger = container.get<LoggerPort>(LOGGER);
const database = container.get(PostgresDataSource);
const webServer = container.get(ExpressWebServer);

async function main() {
  await database.start();
  await webServer.start();
}

main().catch((error) => {
  logger.error(error);
});
