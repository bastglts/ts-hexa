import { v4 } from 'uuid';

import { SendMoneyCommand } from '../ports/in/send-money.port';
import { SendMoneyService } from './send-money.service';

describe('SendMoneyService', () => {
  let sut: SendMoneyService;

  beforeEach(() => {
    sut = new SendMoneyService();
  });

  it('should throw error when amount is > 1000', async () => {
    const sourceAccountId = v4();
    const targetAccountId = v4();

    const sendMoneyCommand = new SendMoneyCommand(1500, sourceAccountId, targetAccountId);
    await expect(sut.handle(sendMoneyCommand)).rejects.toThrowError();
  });

  // it('sends money from an account to the other', async () => {
  //   const sourceAccountId = v4();
  //   const targetAccountId = v4();

  //   // given
  //   const sendMoneyCommand = new SendMoneyCommand(100, sourceAccountId, targetAccountId);

  //   // when
  //   const res = await sut.handle(sendMoneyCommand);

  //   // then
  // });
});
