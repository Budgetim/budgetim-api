import { Request, Response } from 'express';
import Transaction from '../../models/transaction';
import { TransactionClient } from '../../types';

export interface EditTransactionRequest extends Request {
  body: TransactionClient & { categoryId: number };
}

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body } = req;
  const transaction = await Transaction.edit(body);
  res.send(transaction);
};
