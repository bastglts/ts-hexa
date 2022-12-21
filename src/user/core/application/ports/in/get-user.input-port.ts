import { User } from '../../../domain/user';

export const GET_USER_INPUT_PORT = Symbol.for('GetUserInputPort');

export interface GetUserInputPort {
  workWith: (userUid: string) => Promise<User>;
}
