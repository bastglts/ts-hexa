import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  DeactivateUserInputPort,
  DEACTIVATE_USER_INPUT_PORT,
} from '../../../core/application/ports/in/deactivate-user.port';

interface DeactivateUserBody {
  userId?: string;
}

@injectable()
export class DeactivateUserController implements ExpressController {
  readonly route = '/users/deactivate';
  readonly method = 'post';

  constructor(@inject(DEACTIVATE_USER_INPUT_PORT) private readonly _deactivateUserService: DeactivateUserInputPort) {}

  async handler(req: Request<unknown, unknown, DeactivateUserBody>, res: Response) {
    const { userId } = req.body;

    // input validation
    if (!userId) throw new httpErrors.BadRequest('userId cannot be empty');

    await this._deactivateUserService.handle(userId);
    res.json({});
  }
}
