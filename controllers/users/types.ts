import { Request } from 'express';

import { User, UserWithoutId } from '../../types';

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