import { pool } from './db';
import { convertTransaction } from './convertTransaction';

export default class Transaction {
  static async get() {
    const transactions: any = await pool.query(`
      SELECT transaction.id, transaction.title, category.title AS category, transaction.price, transaction.date FROM transaction
      INNER JOIN category ON transaction.category_id = category.id
    `);
    return transactions[0].map(transaction => convertTransaction(transaction));
  }

  static async getById(id: number) {
    const transaction = await pool.query(`
    SELECT transaction.id, transaction.title, category.title AS category, transaction.price, transaction.date FROM transaction 
    INNER JOIN category ON transaction.category_id = category.id
    WHERE ?? = ?`,
      ['transaction.id', id]
    );
    return transaction[0][0];
  }

  static async add({ title, categoryId, price, date }: { title: string; categoryId: number; price: number; date: string }) {
    const res: any = await pool.query(
      'insert into transaction (title, category_id, price, date, client_id) values (?, ?, ?, ?, ?)',
      [title, categoryId, price, date, 1],
    );
    const transaction = await this.getById(res[0].insertId);
    return convertTransaction(transaction);
  }

  static async delete(id: number) {
    const res = await pool.query('delete from transaction where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, title, categoryId, price, date }: { id: number; title: string; categoryId: number; price: number; date: string; }) {
    await pool.query('UPDATE transaction SET title = ?, category_id = ?, price = ?, date = ? WHERE id = ?', [title, categoryId, price, date, id],);
    const transaction = await this.getById(id);
    return convertTransaction(transaction);
  }
}