import { UUID_V4_REGEX } from '../../../../shared/test/utils';
import { InMemoryUserRepository } from '../../../adapters/out/persistence/user.repository.in-memory';
import { CannotRegisterUnderageUserError } from '../../domain/errors';
import { RegisterUserInput } from '../ports/in/register-user.input-port';
import { RegisterUserService } from './register-user.service';

describe('RegisterUserService', () => {
  let repoStub: InMemoryUserRepository;
  let sut: RegisterUserService;

  beforeEach(() => {
    repoStub = new InMemoryUserRepository();
    sut = new RegisterUserService(repoStub);
  });

  it('registers an adult user and activate her', async () => {
    // given
    const adultUserInput: RegisterUserInput = {
      firstName: 'john',
      lastName: 'doe',
      email: 'john.doe@example.com',
      age: 45,
    };

    // when
    const res = await sut.workWith(adultUserInput);

    // then
    expect(res).toMatch(UUID_V4_REGEX);
    expect(repoStub.users[0]).toMatchObject({ ...adultUserInput, active: true });
  });

  it('does not register an underage user', async () => {
    expect.assertions(2);

    // given
    const underageUserInput: RegisterUserInput = {
      firstName: 'john',
      lastName: 'doe',
      email: 'john.doe@example.com',
      age: 16,
    };

    try {
      // when
      await sut.workWith(underageUserInput);
    } catch (err) {
      // then
      expect(err).toBeInstanceOf(CannotRegisterUnderageUserError);
      expect(repoStub.users).toBeEmpty();
    }
  });
});
