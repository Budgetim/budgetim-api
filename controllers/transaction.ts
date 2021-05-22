import { Request, Response } from 'express';
import Transaction from '../models/transaction';

export const getTransactions = async (req: Request, res: Response) => {
  const [data] = await Transaction.get();
  res.send(data);
}

interface RequestAddTask extends Request {
  query: {
    category: string;
    money: string,
    description: string;
  }
}

export const addTransaction = async (req: RequestAddTask, res: Response) => {
  const { body } = req;

  const { category, money, description } = body;
  await Transaction.add({ category, money: +money, description });
  res.send(200);
};

export interface RequestDeleteTask extends Request {
  query: {
    id: string;
  }
}

export const deleteTransaction = async (req: RequestDeleteTask, res: Response) => {
  const { query } = req;
  const [data] = await Transaction.delete(+query.id);
  res.send(data);
};

export interface RequestEditTask extends Request {
  query: {
    id: string;
    category: string;
    money: string,
    description: string;
  }
}

export const editTransaction = async (req: RequestEditTask, res: Response) => {
  const { body } = req;
  const { id, category, money, description } = body;
  await Transaction.edit({ id: +id, category, money, description });
  res.send(200);
};
