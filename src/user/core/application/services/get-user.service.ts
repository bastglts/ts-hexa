import { inject, injectable } from 'inversify';

import { UserNotFoundError } from '../../domain/errors';
import { GetUserInputPort } from '../ports/in/get-user.input-port';
import { UserRepositoryOutputPort, USER_REPOSITORY_OUTPUT_PORT } from '../ports/out/user-repository.output-port';

@injectable()
export class GetUserService implements GetUserInputPort {
  constructor(@inject(USER_REPOSITORY_OUTPUT_PORT) private readonly _userRepository: UserRepositoryOutputPort) {}

  async workWith(userUid: string) {
    const user = await this._userRepository.getById(userUid);

    if (!user) throw new UserNotFoundError(userUid);

    return user;
  }
}
