import { Request } from 'express';

import { RequestWithUser, User, UserWithoutId } from '../../types';

export interface RegisterRequest extends Request {
  body: UserWithoutId;
}

export interface AuthenticateRequest extends Request {
  body: {
    email: User['email'];
    password: User['password'];
  };
}

export interface VerifyRequest extends Request {
  params: {
    id: string;
    token: string;
  };
}

export interface ResetPasswordRequest extends Request {
  body: {
    email: User['email'];
  };
}

export interface UpdateCurrencyRequest extends RequestWithUser {
  body: {
    currencyId: number;
  };
}

export interface UpdatePasswordRequest extends RequestWithUser {
  body: {
    password: string;
  };
}