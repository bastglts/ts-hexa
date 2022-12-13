import { inject, injectable } from 'inversify';
import { UserNotFoundError } from '../../domain/errors';

import { DeactivateUserInputPort } from '../ports/in/deactivate-user.port';
import { UserRepositoryOutputPort, USER_REPOSITORY_OUTPUT_PORT } from '../ports/out/user-repository.output-port';

@injectable()
export class DeactivateUserService implements DeactivateUserInputPort {
  constructor(@inject(USER_REPOSITORY_OUTPUT_PORT) private readonly _userRepository: UserRepositoryOutputPort) {}

  async handle(userId: string) {
    const user = await this._userRepository.getById(userId);

    if (!user) throw new UserNotFoundError(userId);

    // user.deactivate('reason');
    // await this._userRepository.update(user);

    await this._userRepository.deactivate(user);
  }
}
