import { inject, injectable } from 'inversify';
import { CannotRegisterUnderageUserError } from '../../domain/errors';

import { User, UserProps } from '../../domain/user';
import { RegisterUserInputPort } from '../ports/in/register-user.input-port';
import { UserRepositoryOutputPort, USER_REPOSITORY_OUTPUT_PORT } from '../ports/out/user-repository.output-port';

@injectable()
export class RegisterUserService implements RegisterUserInputPort {
  constructor(@inject(USER_REPOSITORY_OUTPUT_PORT) private readonly _userRepository: UserRepositoryOutputPort) {}

  async workWith(userProps: UserProps) {
    // business rule
    if (userProps.age < 18) throw new CannotRegisterUnderageUserError(userProps.age);

    const user = new User(userProps);

    const createdUser = await this._userRepository.save(user);

    return createdUser.uid;
  }
}
