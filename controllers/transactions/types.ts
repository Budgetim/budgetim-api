import { RequestWithUser, Transaction, TransactionWithoutId } from '../../types';

export interface GetTransactionRequest extends RequestWithUser {
  query: {
    year: string;
    month: string;
    category?: string;
  };
}

export interface AddTransactionRequest extends RequestWithUser {
  body: TransactionWithoutId;
}

export interface DeleteTransactionRequest extends RequestWithUser {
  body: {
    id: Transaction['id'];
  }
}

export interface EditTransactionRequest extends RequestWithUser {
  body: Transaction;
}
