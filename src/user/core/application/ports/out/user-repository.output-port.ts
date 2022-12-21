import { User } from '../../../domain/user';

export interface UserRepositoryOutputPort {
  save: (user: User) => Promise<User>;
  getById: (userUid: string) => Promise<User | undefined>;
}

export const USER_REPOSITORY_OUTPUT_PORT = Symbol.for('UserRepositoryOutputPort');
