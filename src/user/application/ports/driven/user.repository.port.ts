import { User } from '../../../domain/user';

export interface UserRepositoryPort {
  save: (user: User) => Promise<User>;
  getById: (userUid: string) => Promise<User | undefined>;
}

export const USER_REPOSITORY = Symbol.for('UserRepository');
