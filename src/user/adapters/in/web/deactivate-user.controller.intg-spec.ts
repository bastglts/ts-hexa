import request from 'supertest';

import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  UserRepositoryOutputPort,
  USER_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/user-repository.output-port';
import { User } from '../../../core/domain/user';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const userRepository = container.get<UserRepositoryOutputPort>(USER_REPOSITORY_OUTPUT_PORT);

describe(`/user/deactivate`, () => {
  beforeAll(async () => {
    await database.start();
  });

  afterAll(async () => {
    await database.stop();
  });

  it(`deactivate user`, async () => {
    // given
    await userRepository.save(
      new User({
        uid: 'user-uid-1',
        age: 27,
        email: 'bg@mail.com',
        firstName: 'B',
        lastName: 'G',
        active: true,
      }),
    );

    // when
    await request(expressApp)
      .post('/users/deactivate')
      .send({ userId: 'user-uid-1' })
      .set('Accept', 'application/json')
      .expect(200);

    // then
    expect((await userRepository.getById('user-uid-1'))?.active).toBe(false);
  });
});
