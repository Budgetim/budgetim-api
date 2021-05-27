import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

interface AddTransactionRequest extends Request {
  body: {
    category: number;
    money: number,
    description: string;
  }
}

export const addTransaction = async (req: AddTransactionRequest, res: Response) => {
  const { body } = req;
  await Transaction.add(body);
  res.send(200);
};
