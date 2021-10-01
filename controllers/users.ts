import { Request, Response } from 'express';
import User from '../models/user';

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

interface AuthenticateRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const registerUser = async (req: RegisterRequest, res: Response) => {
  const { body } = req;

  const user = User.create(body);
  res.send(user);
};

export const authenticateUser = async (req: AuthenticateRequest, res: Response) => {
  const { body } = req;

  const user = await User.authenticate(body);
  res.send(user);
};