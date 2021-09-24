import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.get();
  res.send(transactions);
};
