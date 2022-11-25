import { UserProps } from '../../../domain/user';

export const REGISTER_USER_SERVICE = Symbol.for('RegisterUserService');

export interface RegisterUserPort {
  workWith: (userProps: UserProps) => Promise<string>;
}
