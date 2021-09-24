import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export interface DeleteTransactionRequest extends Request {
  params: {
    id: string;
  }
}

export const deleteTransaction = async (req: DeleteTransactionRequest, res: Response) => {
  const { body: { id } } = req;
  const transaction = await Transaction.delete(+id);
  res.send(transaction);
};
