import { RequestWithUser, TransactionWithoutId } from '../../types';

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
  params: {
    id: string;
  };
}

export interface EditTransactionRequest extends RequestWithUser {
  body: TransactionWithoutId;
  params: {
    id: string;
  };
}
