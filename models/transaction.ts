import { pool } from './db';

export default class Transaction {
  static async get() {
    const transactions = await pool.query(`
    SELECT transactions.id, categories.title AS category, transactions.money, transactions.description, date FROM transactions 
    INNER JOIN categories ON transactions.category_id = categories.id;
    `);
    return transactions;
  }

  static async add({ category, money, description }: { category: number; money: number; description: string; }) {
    const res = await pool.query(
      'insert into transactions (category_id, client_id, money, description, date) values (?, ?, ?, ?, ?)',
      [category, 2, money, description, '2021-04-22'],
    );
    return res;
  }

  static async delete(id: number) {
    const res = await pool.query('delete from transactions where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, category, money, description }: { id: number; category: number; money: number; description: string; }) {
    const res = await pool.query('update transactions set category_id = ?, money = ?, description = ? where id = ?', [category, money, description, id],);
    return res;
  }
}
