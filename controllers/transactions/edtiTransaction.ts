import { Request, Response } from 'express';
import Transaction from '../../models/Transaction';

export interface EditTransactionRequest extends Request {
  body: {
    id: string;
    category?: string;
    price?: number,
    description?: string;
  }
}

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body } = req;
  const { id, ...params } = body;

  const transaction = await Transaction.findByIdAndUpdate(id, params, { upsert: true });
  res.send(transaction);
};
