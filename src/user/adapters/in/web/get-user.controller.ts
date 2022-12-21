import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';
import { validate as isValidUuid } from 'uuid';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import { GetUserInputPort, GET_USER_INPUT_PORT } from '../../../core/application/ports/in/get-user.input-port';
import { UserNotFoundError } from '../../../core/domain/errors';

@injectable()
export class GetUserController implements ExpressController {
  readonly route = '/users/:userUid';
  readonly method = 'get';

  constructor(@inject(GET_USER_INPUT_PORT) private readonly _getUserService: GetUserInputPort) {}

  async handler(req: Request, res: Response) {
    // input validation
    if (!isValidUuid(req.params.userUid)) throw new httpErrors.BadRequest('userUid must be an uuid');

    try {
      const user = await this._getUserService.workWith(req.params.userUid);
      res.json({ user });
    } catch (err) {
      // error translation
      if (err instanceof UserNotFoundError) throw new httpErrors.NotFound(err.message);
      throw err;
    }
  }
}
