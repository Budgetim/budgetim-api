import { pool } from './db';
import { Category as CategoryType } from '../types';
import { ResultSetHeader } from 'mysql2';

export default class Category {
  static async get(userId: number) {
    const categories = await pool.query(`
      SELECT id, title, description, color
      FROM category
      WHERE ?? = ?`,
      ['client_id', userId]
    ) as unknown as [CategoryType[]];
    return categories[0];
  }

  static async getById(id: number) {
    const category = await pool.query(`
      SELECT id, title, color, description FROM category 
      WHERE ?? = ?`,
      ['id', id]
    ) as unknown as [[CategoryType]];
    return category[0][0];
  }

  static async add({ title, color, description, userId }: { title: string; color: null | string; description: string | null; userId: number }) {
    const resultList = await pool.query(
      `INSERT INTO category (title, color, description, client_id) VALUES (?, ?, ?, ?)`,
      [title, color, description, userId],
    );
    const result = resultList[0] as ResultSetHeader;
    const category = await this.getById(result.insertId);
    return category;
  }

  static async delete(id: number, userId: number) {
    const res = await pool.query('delete from category where id = ? AND client_id = ?', [id, userId]);
    return res;
  }

  static async edit({ id, title, description, color, userId }: { id: number; title: string; color: null | string; description: string | null; userId: number }) {
    await pool.query('UPDATE category SET title = ?, description = ?, color = ? WHERE id = ? AND client_id = ?', [title, description, color, id, userId]);
    const category = await this.getById(id);
    return category;
  }

  static async showStatistic(month: number, year: number, userId: number) {
    const result: any = await pool.query(`
      SELECT SUM(transaction.price) as sum, category.id, category.color, category.title, category.description FROM transaction
      INNER JOIN category ON transaction.category_id = category.id
      WHERE transaction.client_id = ?
      AND MONTH(transaction.date) = ?
      AND YEAR(transaction.date) = ?
      GROUP BY category.id, category.color, category.title, category.description
    `, [13, month, year]);
    return result[0];
  }
}