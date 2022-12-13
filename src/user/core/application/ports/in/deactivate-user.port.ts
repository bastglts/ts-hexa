export const DEACTIVATE_USER_INPUT_PORT = Symbol.for('DeactivateUserInputPort');

export interface DeactivateUserInputPort {
  handle: (userId: string) => Promise<void>;
}
