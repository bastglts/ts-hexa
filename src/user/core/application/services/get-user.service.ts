import { inject, injectable } from 'inversify';

import { UserNotFoundError } from '../../domain/errors';
import { UserRepositoryPort, USER_REPOSITORY } from '../ports/driven/user.repository.port';
import { GetUserPort } from '../ports/driving/get-user.port';

@injectable()
export class GetUserService implements GetUserPort {
  constructor(@inject(USER_REPOSITORY) private readonly _userRepository: UserRepositoryPort) {}

  async workWith(userUid: string) {
    const user = await this._userRepository.getById(userUid);

    if (!user) throw new UserNotFoundError(userUid);

    return user;
  }
}
