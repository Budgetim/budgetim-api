import { Request, Response } from 'express';
import User from '../../models/user';

interface AddTransactionRequest extends Request {
  body: {
    email: string;
    password: string;
  }
}

export const createUser = async (req: AddTransactionRequest, res: Response) => {
  const { body } = req;
  await User.createUser(body);
  res.send(200);
};
