import { Request } from 'express';

export interface RequestWithUser extends Request {
  userId: number;
}

export interface Category {
  id: number;
  title: string;
  description: string | null;
  color: string | null;
}

export interface CategorySummary extends Category {
  sum: number;
}

export type CategoryWithoutId = Omit<Category, 'id'>

export interface Transaction {
  id: number;
  title: string;
  categoryId: number | null;
  price: number;
  date: string;
}

export type TransactionWithoutId = Omit<Transaction, 'id'>

export interface CategoryInfoForTransaction {
  categoryId: number;
  categoryTitle: string;
  categoryDescription: string | null;
  categoryColor: string | null;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
  currency: Currency;
}

export type UserWithoutId = Omit<User, 'id'>

export interface Currency {
  id: number;
  title: string;
  unit: string;
}

export interface CurrencyInfoForUser {
  currencyId: number;
  currencyTitle: string;
  currencyUnit: string;
}