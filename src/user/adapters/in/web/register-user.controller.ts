import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterUserInputPort,
  REGISTER_USER_INPUT_PORT,
} from '../../../core/application/ports/in/register-user.input-port';
import { CannotRegisterUnderageUserError } from '../../../core/domain/errors';

interface RegisterUserBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
}

@injectable()
export class RegisterUserController implements ExpressController {
  readonly route = '/users/register';
  readonly method = 'post';

  constructor(@inject(REGISTER_USER_INPUT_PORT) private readonly _registerUserService: RegisterUserInputPort) {}

  async handler(req: Request<unknown, unknown, RegisterUserBody>, res: Response) {
    const { firstName, lastName, email, age } = req.body;

    // input validation
    if (!firstName) throw new httpErrors.BadRequest('firstName cannot be empty');
    if (!lastName) throw new httpErrors.BadRequest('lastName cannot be empty');
    if (!email) throw new httpErrors.BadRequest('email cannot be empty');
    if (!age || isNaN(+age) || +age < 0) throw new httpErrors.BadRequest('age must be a positive integer');

    try {
      const userUid = await this._registerUserService.workWith({ firstName, lastName, email, age: +age });
      res.json({ userUid });
    } catch (err) {
      // error translation
      if (err instanceof CannotRegisterUnderageUserError) throw new httpErrors.BadRequest(err.message);
      throw err;
    }
  }
}
