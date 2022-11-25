import { DataSource } from 'typeorm';

import { LoggerPort } from '../../application/ports/driven/logger.port';

export interface PostgresConfig {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
}

export class PostgresDataSource extends DataSource {
  constructor(config: PostgresConfig, private readonly _logger: LoggerPort) {
    super({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [`${process.cwd()}/src/*/adapters/driven/persistence/*.orm-entity.@(js|ts)`],
    });
  }

  async start() {
    await this.initialize();
    this._logger.info('Postgres database connection established');
  }

  async stop() {
    await this.destroy();
    this._logger.info('Postgres database connection closed');
  }
}
