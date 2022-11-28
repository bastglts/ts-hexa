import { User } from '../../../domain/user';

export const GET_USER_SERVICE = Symbol.for('GetUserService');

export interface GetUserPort {
  workWith: (userUid: string) => Promise<User>;
}
