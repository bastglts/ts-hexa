import { inject, injectable } from 'inversify';
import { CannotRegisterUnderageUserError } from '../../domain/errors';

import { User } from '../../domain/user';
import { RegisterUserInput, RegisterUserInputPort } from '../ports/in/register-user.input-port';
import { UserRepositoryOutputPort, USER_REPOSITORY_OUTPUT_PORT } from '../ports/out/user-repository.output-port';

// Responsabilities
// 1. Take input
// 2. Validate business rules
// 3. Manipulate model state
// 4. Return output

@injectable()
export class RegisterUserService implements RegisterUserInputPort {
  constructor(@inject(USER_REPOSITORY_OUTPUT_PORT) private readonly _userRepository: UserRepositoryOutputPort) {}

  async workWith(input: RegisterUserInput) {
    // business rule
    if (input.age < 18) throw new CannotRegisterUnderageUserError(input.age);

    const user = new User({ ...input, active: true });

    const createdUser = await this._userRepository.save(user);

    return createdUser.uid;
  }
}

// User story:
// Ajouter Notion d'activation
// 1. Register-user > active le user
// 2. Deactivate-user use case
