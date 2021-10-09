import { pool } from './db';
import { Category as CategoryType } from '../types';

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
    const res: any = await pool.query(
      'insert into category (title, color, description, client_id) values (?, ?, ?, ?)',
      [title, color, description, userId],
    );
    const category = await this.getById(res[0].insertId);
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
}