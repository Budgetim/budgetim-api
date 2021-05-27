import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export interface DeleteTransactionRequest extends Request {
  query: {
    id: string;
  }
}

export const deleteTransaction = async (req: DeleteTransactionRequest, res: Response) => {
  const { query } = req;
  const [data] = await Transaction.delete(+query.id);
  res.send(data);
};
