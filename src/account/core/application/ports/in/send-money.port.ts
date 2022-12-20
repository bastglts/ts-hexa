export const SEND_MONEY_SERVICE = Symbol.for('SendMoneyService');

export class SendMoneyCommand {
  constructor(
    public readonly amount: number,
    public readonly sourceAccountId: string,
    public readonly targetAccountId: string,
  ) {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (sourceAccountId === targetAccountId) {
      throw new Error('Source and target account must be different');
    }
    if (!sourceAccountId) {
      throw new Error('Source account id must be provided');
    }
    if (!targetAccountId) {
      throw new Error('Target account id must be provided');
    }
  }
}

export interface SendMoneyPort {
  handle: (sendMoneyCommand: SendMoneyCommand) => Promise<void>;
}
