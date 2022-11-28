import { Container } from 'inversify';

import { config } from './config';
import { PinoLogger } from './shared/adapters/driven/pino-logger';
import { PostgresDataSource } from './shared/adapters/driven/postgres-datasource';
import { ExpressWebServer } from './shared/adapters/driving/express-web-server';
import { LOGGER, LoggerPort } from './shared/ports/driven/logger.port';
import { UserTypeormEntity } from './user/adapters/driven/persistence/user.orm-entity';
import { SqlUserRepository } from './user/adapters/driven/persistence/user.repository.sql';
import { GetUserController } from './user/adapters/driving/web/get-user.controller';
import { RegisterUserController } from './user/adapters/driving/web/register-user.controller';
import { UserRepositoryPort, USER_REPOSITORY } from './user/core/application/ports/driven/user.repository.port';
import { GetUserPort, GET_USER_SERVICE } from './user/core/application/ports/driving/get-user.port';
import { RegisterUserPort, REGISTER_USER_SERVICE } from './user/core/application/ports/driving/register-user.port';
import { GetUserService } from './user/core/application/services/get-user.service';
import { RegisterUserService } from './user/core/application/services/register-user.service';

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
});

/**
 *  driving adapters
 */
container.bind(ExpressWebServer).toDynamicValue(() => {
  const controllers = [container.get(GetUserController), container.get(RegisterUserController)];
  return new ExpressWebServer(config.express, container.get(LOGGER), controllers);
});

/**
 *  application services
 */
container.bind<RegisterUserPort>(REGISTER_USER_SERVICE).to(RegisterUserService);
container.bind<GetUserPort>(GET_USER_SERVICE).to(GetUserService);

/**
 *  driven adapters
 */
container.bind<LoggerPort>(LOGGER).toDynamicValue(() => new PinoLogger(config.logger));
container.bind(PostgresDataSource).toDynamicValue(() => new PostgresDataSource(config.postgres, container.get(LOGGER)));
container
  .bind<UserRepositoryPort>(USER_REPOSITORY)
  .toDynamicValue(() => new SqlUserRepository(container.get(PostgresDataSource).getRepository(UserTypeormEntity)));
