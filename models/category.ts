import { pool } from './db';

export default class Category {
  static async get() {
    const categories: any = await pool.query(`SELECT id, title, description, color FROM category`);
    return categories[0];
  }

  static async getById(id: number) {
    const category = await pool.query(`
    SELECT id, title, color, description FROM category 
    WHERE ?? = ?`,
      ['id', id]
    );
    return category[0][0];
  }

  static async add({ title, color, description }: { title: string; color: null | string; description: string | null }) {
    const res: any = await pool.query(
      'insert into category (title, color, description, client_id) values (?, ?, ?, ?)',
      [title, color, description, 1],
    );
    const category = await this.getById(res[0].insertId);
    return category;
  }

  static async delete(id: number) {
    const res = await pool.query('delete from category where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, title, description, color }: { id: number; title: string; color: null | string; description: string | null }) {
    await pool.query('UPDATE category SET title = ?, description = ?, color = ? WHERE id = ?', [title, description, color, id],);
    const category = await this.getById(id);
    return category;
  }
}