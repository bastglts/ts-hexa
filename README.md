# Typescript Hexagonal

Starter repository for hexagonal architecture workshops

## Getting Started

### Install

Clone the repository and create the dotenv file:

```shell
cp example.env .env
```

Next, ensure that the project can build:

```shell
# Install packages 📦
yarn

# Build 🏗
yarn build
```

### Running the app

Start Docker containers:

```bash
docker-compose up -d
```

Run the database migrations:

```shell
yarn mig:run
```

Run the service:

```shell
# development mode (watch) 👀
yarn start:dev

# production mode 🚀
yarn start
```

### Useful Commands

| Command                                 | Action                                                  |
| --------------------------------------- | ------------------------------------------------------- |
| `yarn lint`                             | Analyze the code with `ESLint`                          |
| `yarn lint:fix`                         | Analyze the code with `ESLint` and fix problems         |
| `yarn build`                            | Build the project with `tsc`                            |
| `yarn start`                            | Start the project using the transpiled code             |
| `yarn start:dev`                        | Start the project using typescript and watch mode       |
| `yarn test`                             | Execute all the tests                                   |
| `yarn test:unit`                        | Execute the unit tests                                  |
| `yarn test:intg`                        | Execute the integration tests                           |
| `yarn mig:generate ./migrations/<name>` | Generate database migration from typeorm schema changes |
| `yarn mig:run`                          | Run the database migrations                             |
| `yarn mig:revert`                       | Revert the last database migration                      |
