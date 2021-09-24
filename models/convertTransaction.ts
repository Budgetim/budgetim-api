import { TransactionClient, TransactionDataBase } from '../types';

export const convertTransaction = (transaction: TransactionDataBase): TransactionClient => {
  return {
    id: transaction.id,
    title: transaction.title,
    category: transaction.category,
    price: +transaction.price,
    date: transaction.date,
  };
};
