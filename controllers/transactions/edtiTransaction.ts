import { Request, Response } from 'express';
import Transaction from '../../models/transaction';

export interface EditTransactionRequest extends Request {
  params: {
    id: string;
  }
  body: {
    category: number;
    money: number,
    description: string;
  }
}

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body, params } = req;
  await Transaction.edit({ ...body, id: +params.id });
  res.send(200);
};
