const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOSTNAME || 'localhost',
  port: +(process.env.POSTGRES_DATABASE_PORT || 5432),
  username: process.env.POSTGRES_DATABASE_USER || 'docker',
  password: process.env.POSTGRES_DATABASE_PASSWORD || 'docker',
  database: process.env.POSTGRES_DATABASE_NAME || 'ts-hexa',
  entities: [`${__dirname}/src/*/adapters/driven/persistence/*.orm-entity.@(ts|js)`],
  migrations: [`${__dirname}/migrations/*.@(ts|js)`],
  migrationsTransactionMode: 'all',
});

module.exports = { dataSource };
