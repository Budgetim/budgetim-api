import { pool } from './db';
import {
  CategoryInfoForTransaction,
  Transaction as TransactionType,
  TransactionWithoutId
} from '../types';
import { ResultSetHeader } from 'mysql2';

const getTransaction = (transaction: TransactionType & CategoryInfoForTransaction ) => {
  const { categoryId, categoryTitle, categoryColor, categoryDescription, ...other } = transaction;
  return {
    ...other,
    category: {
      id: categoryId,
      title: categoryTitle,
      description: categoryDescription,
      color: categoryColor,
    }
  }
}

export default class Transaction {
  static async get({ userId, month, year, category }: { userId: number; month: string; year: string; category?: string; }) {
    const categoryTemplateQuery = category ? `AND transaction.category_id = ?` : '';
    const transactions = await pool.query(`
      SELECT transaction.id, transaction.title, category.title AS categoryTitle, category.color AS categoryColor, transaction.category_id AS categoryId, transaction.price, transaction.date
      FROM transaction
      LEFT JOIN category ON transaction.category_id = category.id
      WHERE transaction.client_id = ?
      AND MONTH(transaction.date) = ?
      AND YEAR(transaction.date) = ?
      ${categoryTemplateQuery}
      ORDER BY transaction.date DESC`,
      [userId, month, year, category],
    ) as unknown as [(TransactionType & CategoryInfoForTransaction)[]];
    return transactions[0].map(transaction => getTransaction(transaction));
  }

  static async getById(id: number) {
    const transaction = await pool.query(`
    SELECT transaction.id, transaction.title, category.title AS categoryTitle, category.color AS categoryColor, transaction.category_id AS categoryId, transaction.price, transaction.date FROM transaction 
    LEFT JOIN category ON transaction.category_id = category.id
    WHERE ?? = ?`,
      ['transaction.id', id]
    );
    return getTransaction(transaction[0][0]);
  }

  static async add({ title, categoryId, price, date, userId }: TransactionWithoutId & { userId: number }) {
    const resultList = await pool.query(`
      INSERT INTO transaction (title, category_id, price, date, client_id)
      VALUES (?, ?, ?, ?, ?)`,
      [title, categoryId, price, date, userId],
    );
    const result = resultList[0] as ResultSetHeader;
    const transaction = await this.getById(result.insertId);
    return transaction;
  }

  static async delete(id: number, userId: number) {
    const res = await pool.query(`
     DELETE FROM transaction
     WHERE id = ? AND client_id = ?`,
      [id, userId],
    );
    return res;
  }

  static async edit({ id, title, categoryId, price, date, userId }: TransactionType & { userId: number }) {
    await pool.query(`
      UPDATE transaction SET title = ?, category_id = ?, price = ?, date = ?
      WHERE id = ? AND client_id = ?`,
      [title, categoryId, price, date, id, userId],
    );
    const transaction = await this.getById(id);
    return transaction;
  }
}