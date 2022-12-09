import { InMemoryUserRepository } from '../../../adapters/out/persistence/user.repository.in-memory';
import { UserNotFoundError } from '../../domain/errors';
import { User } from '../../domain/user';
import { DeactivateUserService } from './deactivate-user.service';

describe('Deactivate User Service', () => {
  let sut: DeactivateUserService;
  let repoStub: InMemoryUserRepository;

  beforeEach(() => {
    repoStub = new InMemoryUserRepository();
    sut = new DeactivateUserService(repoStub);
  });

  it('should deactivate user', async () => {
    // given
    await repoStub.save(
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
    await sut.handle('user-uid-1');

    // then
    expect(repoStub.users[0].active).toBe(false);
  });

  it('should throw an UserNotFound if no user is passed', async () => {
    expect.assertions(1);

    // given
    const userId = 'some-user-id';

    // when
    try {
      await sut.handle(userId);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundError);
    }
  });
});
