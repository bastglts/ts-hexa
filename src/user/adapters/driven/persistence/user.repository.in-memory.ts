import { injectable } from 'inversify';

import { UserRepositoryPort } from '../../../application/ports/driven/user.repository.port';
import { User } from '../../../domain/user';

@injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  public readonly users: User[] = [];

  save(user: User) {
    this.users.push(user);
    return Promise.resolve(user);
  }

  async getById(userUid: string) {
    return Promise.resolve(this.users.find((user) => user.uid === userUid));
  }
}
