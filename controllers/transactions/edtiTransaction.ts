import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export interface EditTransactionRequest extends Request {
  body: {
    id: number;
    category: number;
    money: number,
    description: string;
  }
}

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body } = req;
  await Transaction.edit(body);
  res.send(200);
};
