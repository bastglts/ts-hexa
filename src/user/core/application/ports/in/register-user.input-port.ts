export const REGISTER_USER_INPUT_PORT = Symbol.for('RegisterUserInputPort');

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}
export interface RegisterUserInputPort {
  workWith: (input: RegisterUserInput) => Promise<string>;
}
