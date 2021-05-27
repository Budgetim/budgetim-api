import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export const getTransactions = async (req: Request, res: Response) => {
  const [data] = await Transaction.get();
  res.send(data);
}
