import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/driving/express-web-server';
import { RegisterUserPort, REGISTER_USER_SERVICE } from '../../../application/ports/driving/register-user.port';
import { CannotRegisterUnderageUserError } from '../../../domain/errors';

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

  constructor(@inject(REGISTER_USER_SERVICE) private readonly _registerUserService: RegisterUserPort) {}

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
