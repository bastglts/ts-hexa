import { injectable } from 'inversify';

import { UserRepositoryOutputPort } from '../../../core/application/ports/out/user-repository.output-port';
import { User } from '../../../core/domain/user';

@injectable()
export class InMemoryUserRepository implements UserRepositoryOutputPort {
  public readonly users: User[] = [];

  save(user: User) {
    this.users.push(new User({ ...user }));
    return Promise.resolve(user);
  }

  async getById(userUid: string) {
    const _user = this.users.find((user) => user.uid === userUid);
    if (!_user) return undefined;

    const user = new User({ ..._user });
    return Promise.resolve(user);
  }

  deactivate(user: User) {
    user.active = false;
    const index = this.users.findIndex((_user) => _user.uid === user.uid);
    this.users[index] = user;
    return Promise.resolve();
  }
}
