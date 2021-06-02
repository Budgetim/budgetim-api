import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export interface DeleteTransactionRequest extends Request {
  params: {
    id: string;
  }
}

export const deleteTransaction = async (req: DeleteTransactionRequest, res: Response) => {
  const { params } = req;
  const [data] = await Transaction.delete(+params.id);
  res.send(data);
};
