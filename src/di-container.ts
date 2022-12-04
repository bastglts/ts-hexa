import { Container } from 'inversify';

import { config } from './config';
import { ExpressWebServer } from './shared/adapters/in/express-web-server';
import { PinoLogger } from './shared/adapters/out/pino-logger';
import { PostgresDataSource } from './shared/adapters/out/postgres-datasource';
import { LOGGER, LoggerPort } from './shared/ports/out/logger.port';
import { GetUserController } from './user/adapters/in/web/get-user.controller';
import { RegisterUserController } from './user/adapters/in/web/register-user.controller';
import { UserTypeormEntity } from './user/adapters/out/persistence/user.orm-entity';
import { SqlUserRepository } from './user/adapters/out/persistence/user.repository.sql';
import { GetUserPort, GET_USER_SERVICE } from './user/core/application/ports/in/get-user.port';
import { RegisterUserPort, REGISTER_USER_SERVICE } from './user/core/application/ports/in/register-user.port';
import { UserRepositoryPort, USER_REPOSITORY } from './user/core/application/ports/out/user.repository.port';
import { GetUserService } from './user/core/application/services/get-user.service';
import { RegisterUserService } from './user/core/application/services/register-user.service';

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
});

/**
 *  input/driving/primary adapters
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
 *  output/driven/secondary adapters
 */
container.bind<LoggerPort>(LOGGER).toDynamicValue(() => new PinoLogger(config.logger));
container.bind(PostgresDataSource).toDynamicValue(() => new PostgresDataSource(config.postgres, container.get(LOGGER)));
container
  .bind<UserRepositoryPort>(USER_REPOSITORY)
  .toDynamicValue(() => new SqlUserRepository(container.get(PostgresDataSource).getRepository(UserTypeormEntity)));
