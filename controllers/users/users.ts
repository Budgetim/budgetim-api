import { Response } from 'express';

import User from '../../models/user';

import { AuthenticateRequest, RegisterRequest } from './types';

export const registerUser = async (req: RegisterRequest, res: Response) => {
  const { body } = req;

  const user = await User.create(body);
  res.send(user);
};

export const authenticateUser = async (req: AuthenticateRequest, res: Response) => {
  const { body } = req;

  const user = await User.authenticate(body);
  res.send(user);
};
