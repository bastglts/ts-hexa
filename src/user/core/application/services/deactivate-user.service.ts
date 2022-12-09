import { inject, injectable } from 'inversify';
import { UserNotFoundError } from '../../domain/errors';

import { DeactivateUserPort } from '../ports/in/deactivate-user.port';
import { UserRepositoryPort, USER_REPOSITORY } from '../ports/out/user.repository.port';

@injectable()
export class DeactivateUserService implements DeactivateUserPort {
  constructor(@inject(USER_REPOSITORY) private readonly _userRepository: UserRepositoryPort) {}

  async handle(userId: string) {
    const user = await this._userRepository.getById(userId);

    if (!user) throw new UserNotFoundError(userId);

    user.active = false;
  }
}
