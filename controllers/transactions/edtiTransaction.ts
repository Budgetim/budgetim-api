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

  await Transaction.findByIdAndUpdate(id, params, { upsert: true }, (err, doc) => {
    if (err) {
      res.send(500);
    }
    res.send(200);
  });
};
