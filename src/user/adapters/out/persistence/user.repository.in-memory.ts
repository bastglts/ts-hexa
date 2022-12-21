import { injectable } from 'inversify';

import { UserRepositoryOutputPort } from '../../../core/application/ports/out/user-repository.output-port';
import { User } from '../../../core/domain/user';

@injectable()
export class InMemoryUserRepository implements UserRepositoryOutputPort {
  public readonly users: User[] = [];

  save(user: User) {
    this.users.push(user);
    return Promise.resolve(user);
  }

  async getById(userUid: string) {
    return Promise.resolve(this.users.find((user) => user.uid === userUid));
  }
}
