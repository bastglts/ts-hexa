import { injectable } from 'inversify';
import { Repository } from 'typeorm';

import { UserRepositoryPort } from '../../../application/ports/driven/user.repository.port';
import { User } from '../../../domain/user';
import { UserTypeormEntity } from './user.orm-entity';

@injectable()
export class SqlUserRepository implements UserRepositoryPort {
  constructor(private readonly _repository: Repository<UserTypeormEntity>) {}

  async save(user: User) {
    const entity = await this._repository.save(UserTypeormEntity.fromDomain(user));

    return entity.toDomain();
  }

  async getById(userUid: string) {
    const userEntity = await this._repository.findOne({ where: { uid: userUid } });

    if (!userEntity) return;

    return userEntity.toDomain();
  }
}
