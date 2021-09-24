import { Request, Response } from 'express';
import Transaction from '../../models/transaction';
import { TransactionClient } from '../../types';

interface AddTransactionRequest extends Request {
  body: TransactionClient;
}

export const addTransaction = async (req: AddTransactionRequest, res: Response) => {
  const { body } = req;
  // @ts-ignore
  const transaction = await Transaction.add(body);
  res.send(transaction);
};
