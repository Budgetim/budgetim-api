import { Request, Response } from 'express';
import Transaction from '../../models/Transaction';

export interface DeleteTransactionRequest extends Request {
  params: {
    id: string;
  }
}

export const deleteTransaction = async (req: DeleteTransactionRequest, res: Response) => {
  const { body: { id } } = req;
  await Transaction.findByIdAndDelete(id);
  res.send(200);
};
