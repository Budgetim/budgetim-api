import { Response } from 'express';

import Transaction from '../../models/transaction';
import { AddTransactionRequest, DeleteTransactionRequest, EditTransactionRequest, GetTransactionRequest } from './types';
import { RequestWithUser } from '../../types';

export const getTransactions = async (req: GetTransactionRequest, res: Response) => {
  const { userId, query: { month, year, category } } = req;
  const transactions = month && year
    ? await Transaction.getByDate({ userId, month, year, category })
    : await Transaction.get({ userId, category });
  res.send(transactions);
};

export const addTransaction = async (req: AddTransactionRequest, res: Response) => {
  const { body, userId } = req;
  const transaction = await Transaction.add({ ...body, userId });
  res.send(transaction);
};

export const deleteTransaction = async (req: DeleteTransactionRequest, res: Response) => {
  const { body: { id }, userId } = req;
  const transaction = await Transaction.delete(+id, userId);
  res.send(transaction);
};

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body, userId } = req;
  const transaction = await Transaction.edit({ ...body, userId });
  res.send(transaction);
};

export const getAvailableMonths = async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  const result = await Transaction.getAvailableMonths(userId);
  res.send(result);
};
