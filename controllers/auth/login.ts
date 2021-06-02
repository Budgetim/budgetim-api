import { Request, Response } from 'express';
import User from '../../models/user';

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  }
}

export const login = async (req: LoginRequest, res: Response) => {
  const { body: { email, password } } = req;
  const user = await User.findUserByEmail(email);
  if (user && User.checkPassword(user, password)) {
    return res.send({ allow: true });
  }
  return res.send({ allow: false });
};
