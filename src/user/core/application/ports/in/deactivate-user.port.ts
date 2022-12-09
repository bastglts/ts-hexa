export const DEACTIVATE_USER_SERVICE = Symbol.for('DeactivateUserService');

export interface DeactivateUserPort {
  handle: (userId: string) => Promise<void>;
}
