import { inject, injectable } from 'inversify';

import { DeactivateUserInputPort } from '../ports/in/deactivate-user.port';
import { UserRepositoryOutputPort, USER_REPOSITORY_OUTPUT_PORT } from '../ports/out/user-repository.output-port';

@injectable()
export class DeactivateUserService implements DeactivateUserInputPort {
  constructor(@inject(USER_REPOSITORY_OUTPUT_PORT) private readonly _userRepository: UserRepositoryOutputPort) {}

  async handle(userId: string) {
    // crud
    await this._userRepository.deactivate(userId);
  }
}
