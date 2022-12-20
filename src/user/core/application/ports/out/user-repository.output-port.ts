import { User } from '../../../domain/user';

export interface UserRepositoryOutputPort {
  save: (user: User) => Promise<User>;
  getById: (userUid: string) => Promise<User | undefined>;
  deactivate: (userId: string) => Promise<void>;
}

export const USER_REPOSITORY_OUTPUT_PORT = Symbol.for('UserRepositoryOutputPort');
