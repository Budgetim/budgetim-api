import { pool } from './db';
import { convertTransaction } from './convertTransaction';

export default class Transaction {
  static async get() {
    // const transactions = await pool.query(`
    // SELECT transaction.id, categories.title AS category, transactions.money, transactions.description, date FROM transactions
    // INNER JOIN categories ON transactions.category_id = categories.id;
    // `);
    const transactions: any = await pool.query(`
    SELECT * FROM transaction
    `);
    return transactions[0].map(transaction => convertTransaction(transaction));
  }

  static async add({ title, category, price, date }: { title: string; category: string; price: number; date: string }) {
    const res: any = await pool.query(
      'insert into transaction (title, category_id, price, date, client_id) values (?, ?, ?, ?, ?)',
      [title, category, price, date, 1],
    );
    const transaction = await pool.query(
      `SELECT * FROM transaction WHERE ?? = ?`,
      ['id', res[0].insertId]
    );
    return convertTransaction(transaction[0][0]);
  }

  static async delete(id: number) {
    const res = await pool.query('delete from transaction where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, title, categoryId, price, date }: { id: number; title: string; categoryId: number; price: number; date: string; }) {
    const res = await pool.query('UPDATE transaction SET title = ?, category_id = ?, price = ?, date = ? WHERE id = ?', [title, categoryId, price, date, id],);

    const transaction = await pool.query(
      `SELECT * FROM transaction WHERE ?? = ?`,
      ['id', id]
    );
    return convertTransaction(transaction[0][0]);
  }
}