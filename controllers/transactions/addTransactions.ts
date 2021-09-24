import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

interface AddTransactionRequest extends Request {
  body: {
    title: string;
    categoryId: number;
    price: number;
    date: string;
  };
}

export const addTransaction = async (req: AddTransactionRequest, res: Response) => {
  const { body } = req;
  // @ts-ignore
  const transaction = await Transaction.add(body);
  res.send(transaction);
};
