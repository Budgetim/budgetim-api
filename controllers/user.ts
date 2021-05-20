import { Request, Response } from 'express';
import User from '../models/user';

export interface RequestLogIn extends Request {
  query: {
    email: string;
    password: string;
  }
}

export const logIn = async (req: RequestLogIn, res: Response) => {
  const { query } = req;
  const data = await User.logIn(query.email, query.password);
  res.send(data);
};
