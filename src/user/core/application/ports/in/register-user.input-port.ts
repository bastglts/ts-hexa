import { UserProps } from '../../../domain/user';

export const REGISTER_USER_INPUT_PORT = Symbol.for('RegisterUserInputPort');

export interface RegisterUserInputPort {
  workWith: (userProps: UserProps) => Promise<string>;
}
