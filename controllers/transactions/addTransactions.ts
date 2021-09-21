import { Request, Response } from 'express';
import Transaction, { TransactionUnit } from '../../models/Transaction';

interface AddTransactionRequest extends Request {
  body: TransactionUnit;
}

export const addTransaction = async (req: AddTransactionRequest, res: Response) => {
  const { body } = req;
  const transaction = new Transaction(body);
  await transaction.save();
  res.send(transaction);
};
