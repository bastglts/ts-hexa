import request from 'supertest';

import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/driven/postgres-datasource';
import { ExpressWebServer } from '../../../../shared/adapters/driving/express-web-server';
import { UserRepositoryPort, USER_REPOSITORY } from '../../../core/application/ports/driven/user.repository.port';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const userRepository = container.get<UserRepositoryPort>(USER_REPOSITORY);

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
