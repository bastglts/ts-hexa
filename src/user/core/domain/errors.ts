import { DomainError } from '../../../shared/domain/error';

export class UserNotFoundError extends DomainError {
  constructor(userUid: string) {
    super(`User ${userUid} not found`);
  }
}

export class CannotRegisterUnderageUserError extends DomainError {
  constructor(age: number) {
    super(`Cannot register underage user (${age} years old)`);
  }
}
