import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export interface EditTransactionRequest extends Request {
  body: {
    id: number;
    title: string;
    categoryId: number;
    price: number;
    date: string;
  };
}

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body } = req;
  const transaction = await Transaction.edit(body);
  res.send(transaction);
};
