import 'reflect-metadata';

import { container } from './di-container';
import { PostgresDataSource } from './shared/adapters/driven/postgres-datasource';
import { ExpressWebServer } from './shared/adapters/driving/express-web-server';
import { LOGGER, LoggerPort } from './shared/application/ports/driven/logger.port';

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
