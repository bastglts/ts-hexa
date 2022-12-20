import { injectable } from 'inversify';

import { SendMoneyCommand, SendMoneyPort } from '../ports/in/send-money.port';

@injectable()
export class SendMoneyService implements SendMoneyPort {
  // constructor(@inject() private readonly _accountRepository: AccountRepositoryPort) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async handle(command: SendMoneyCommand) {
    if (command.amount > 1000) {
      throw new Error('Amount must be lesser than 1000');
    }
    // - tranfert amount < 1000€
    // - check that accounts exist
    // - withdraw on source account if allowed (no overdraft)
    // - deposit on target account
    // - account locks
  }
}
