import { inject, injectable } from 'inversify';
import { CannotRegisterUnderageUserError } from '../../domain/errors';

import { User, UserProps } from '../../domain/user';
import { UserRepositoryPort, USER_REPOSITORY } from '../ports/driven/user.repository.port';
import { RegisterUserPort } from '../ports/driving/register-user.port';

@injectable()
export class RegisterUserService implements RegisterUserPort {
  constructor(@inject(USER_REPOSITORY) private readonly _userRepository: UserRepositoryPort) {}

  async workWith(userProps: UserProps) {
    // business rule
    if (userProps.age < 18) throw new CannotRegisterUnderageUserError(userProps.age);

    const user = new User(userProps);

    const createdUser = await this._userRepository.save(user);

    return createdUser.uid;
  }
}
