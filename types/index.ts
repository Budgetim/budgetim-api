export interface TransactionDataBase {
  id: number;
  title: string;
  category_id: number;
  user_id: number;
  price: string;
  date: string;
}

export interface TransactionClient {
  id: number;
  title: string;
  category: string;
  price: number;
  date: string;
}