import { pool } from './db';
import {
  CategoryInfoForTransaction, CategorySummary,
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
  static async get({ category, userId }: { userId: number; category?: string | null; }) {

    let categoryTemplateQuery = '';
    if (category) {
      categoryTemplateQuery = 'AND transaction.category_id = ?';
    }
    if (category === 'null' || category === null) {
      categoryTemplateQuery = 'AND transaction.category_id IS NULL';
    }

    const transactions = await pool.query(`
      SELECT transaction.id, transaction.title, category.title AS categoryTitle, category.color AS categoryColor, transaction.category_id AS categoryId, transaction.price, transaction.date
      FROM transaction
      LEFT JOIN category ON transaction.category_id = category.id
      WHERE transaction.client_id = ?
      ${categoryTemplateQuery}
      ORDER BY transaction.date DESC`,
      [userId, category],
    ) as unknown as [(TransactionType & CategoryInfoForTransaction)[]];
    return transactions[0].map(transaction => getTransaction(transaction));
  }

  static async getByDate({ category, month, year, userId }: { userId: number; month: string; year: string; category?: string | null; }) {
    let categoryTemplateQuery = '';
    if (category) {
      categoryTemplateQuery = 'AND transaction.category_id = ?';
    }

    if (category === 'null' || category === null) {
      categoryTemplateQuery = 'AND transaction.category_id IS NULL';
    }

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

  static async getAvailableMonths(userId: number) {
    const result = await pool.query(`
      SELECT MIN(transaction.date) as min, MAX(transaction.date) as max
      FROM transaction
      WHERE transaction.client_id = ?`,
      [userId],
    ) as unknown as [CategorySummary[]];

    const range = result[0][0] as unknown as { min: string; max: string } | { min: null; max: null };
    if (!range.min && !range.max) {
      return {
        data: [],
      };
    }
    const listMonths = this.getListMonths(range);
    return listMonths;
  }

  static getListMonths({ min, max }: { min: string, max: string }) {
    const startDate = min;
    const endDate = max;

    const start = startDate.split('-');
    const end = endDate.split('-');
    const startYear = parseInt(start[0]);
    const endYear = parseInt(end[0]);
    const dates = [];

    for(let year = startYear; year <= endYear; year++) {
      const endMonth = year != endYear ? 11 : parseInt(end[1]) - 1;
      const startMon = year === startYear ? parseInt(start[1]) -1 : 0;
      for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        const month = j + 1;
        dates.push({ year, month });
      }
    }
    return { data: dates };
  }
}