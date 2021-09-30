import { pool } from './db';

const getTransaction = (transaction: any) => {
  const { categoryId, categoryTitle, categoryColor, ...other } = transaction;
  return {
    ...other,
    category: {
      id: categoryId,
      title: categoryTitle,
      color: categoryColor,
    }
  }
}

export default class Transaction {
  static async get() {
    const transactions: any = await pool.query(`
      SELECT transaction.id, transaction.title, category.title AS categoryTitle, category.color AS categoryColor, transaction.category_id AS categoryId, transaction.price, transaction.date FROM transaction
      INNER JOIN category ON transaction.category_id = category.id
      ORDER BY transaction.date DESC
    `);
    return transactions[0].map(transaction => getTransaction(transaction));
  }

  static async getById(id: number) {
    const transaction = await pool.query(`
    SELECT transaction.id, transaction.title, category.title AS categoryTitle, category.color AS categoryColor, transaction.category_id AS categoryId, transaction.price, transaction.date FROM transaction 
    INNER JOIN category ON transaction.category_id = category.id
    WHERE ?? = ?`,
      ['transaction.id', id]
    );
    return getTransaction(transaction[0][0]);
  }

  static async add({ title, categoryId, price, date }: { title: string; categoryId: number; price: number; date: string }) {
    const res: any = await pool.query(
      'insert into transaction (title, category_id, price, date, client_id) values (?, ?, ?, ?, ?)',
      [title, categoryId, price, date, 1],
    );
    const transaction = await this.getById(res[0].insertId);
    return transaction;
  }

  static async delete(id: number) {
    const res = await pool.query('delete from transaction where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, title, categoryId, price, date }: { id: number; title: string; categoryId: number; price: number; date: string; }) {
    await pool.query('UPDATE transaction SET title = ?, category_id = ?, price = ?, date = ? WHERE id = ?', [title, categoryId, price, date, id],);
    const transaction = await this.getById(id);
    return transaction;
  }
}