import { Container } from 'inversify';

import { config } from './config';
import { ExpressWebServer } from './shared/adapters/in/express-web-server';
import { PinoLogger } from './shared/adapters/out/pino-logger';
import { PostgresDataSource } from './shared/adapters/out/postgres-datasource';
import { LoggerOutputPort, LOGGER_OUTPUT_PORT } from './shared/ports/out/logger.output-port';
import { DeactivateUserController } from './user/adapters/in/web/deactivate-user.controller';
import { GetUserController } from './user/adapters/in/web/get-user.controller';
import { RegisterUserController } from './user/adapters/in/web/register-user.controller';
import { SqlUserRepository } from './user/adapters/out/persistence/user.repository.sql';
import {
  DeactivateUserInputPort,
  DEACTIVATE_USER_INPUT_PORT,
} from './user/core/application/ports/in/deactivate-user.port';
import { GetUserInputPort, GET_USER_INPUT_PORT } from './user/core/application/ports/in/get-user.input-port';
import {
  RegisterUserInputPort,
  REGISTER_USER_INPUT_PORT,
} from './user/core/application/ports/in/register-user.input-port';
import {
  UserRepositoryOutputPort,
  USER_REPOSITORY_OUTPUT_PORT,
} from './user/core/application/ports/out/user-repository.output-port';
import { DeactivateUserService } from './user/core/application/services/deactivate-user.service';
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
  const controllers = [
    container.get(GetUserController),
    container.get(RegisterUserController),
    container.get(DeactivateUserController),
  ];
  return new ExpressWebServer(config.express, container.get(LOGGER_OUTPUT_PORT), controllers);
});

/**
 *  application services
 */
container.bind<RegisterUserInputPort>(REGISTER_USER_INPUT_PORT).to(RegisterUserService);
container.bind<GetUserInputPort>(GET_USER_INPUT_PORT).to(GetUserService);
container.bind<DeactivateUserInputPort>(DEACTIVATE_USER_INPUT_PORT).to(DeactivateUserService);

/**
 *  output/driven/secondary adapters
 */
container.bind<LoggerOutputPort>(LOGGER_OUTPUT_PORT).toDynamicValue(() => new PinoLogger(config.logger));
container
  .bind(PostgresDataSource)
  .toDynamicValue(() => new PostgresDataSource(config.postgres, container.get(LOGGER_OUTPUT_PORT)));
container.bind<UserRepositoryOutputPort>(USER_REPOSITORY_OUTPUT_PORT).to(SqlUserRepository);
