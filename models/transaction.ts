import { pool } from './db';

export default class Transaction {
  static async get() {
    const transactions = await pool.query('select * from transactions');
    return transactions;
  }

  static async add({ category, money, description }: any) {
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

  static async edit(id: number) {
    const res = await pool.query('update transactions set completed = 1 where ?? = ?', ['id', id]);
    return res;
  }
}
