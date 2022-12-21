import request from 'supertest';

import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  UserRepositoryOutputPort,
  USER_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/user-repository.output-port';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const userRepository = container.get<UserRepositoryOutputPort>(USER_REPOSITORY_OUTPUT_PORT);

describe(`/users/register`, () => {
  beforeAll(async () => {
    await database.start();
  });

  afterAll(async () => {
    await database.stop();
  });

  it(`registers an adult user`, async () => {
    // given
    const adultUser = {
      firstName: 'john',
      lastName: 'doe',
      email: 'john.doe@example.com',
      age: 30,
    };

    // when
    const res: { body: { userUid: string } } = await request(expressApp)
      .post('/users/register')
      .send(adultUser)
      .set('Accept', 'application/json')
      .expect(200);

    // then
    expect(await userRepository.getById(res.body.userUid)).toMatchObject(adultUser);
  });
});
