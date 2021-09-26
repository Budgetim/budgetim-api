import { pool } from './db';

export default class Category {
  static async get() {
    const categories: any = await pool.query(`SELECT id, title FROM category`);
    return categories[0];
  }

  static async getById(id: number) {
    const category = await pool.query(`
    SELECT id, title FROM category 
    WHERE ?? = ?`,
      ['id', id]
    );
    return category[0][0];
  }

  static async add({ title }: { title: string; }) {
    const res: any = await pool.query(
      'insert into category (title, client_id) values (?, ?)',
      [title, 1],
    );
    const category = await this.getById(res[0].insertId);
    return category;
  }

  static async delete(id: number) {
    const res = await pool.query('delete from category where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, title }: { id: number; title: string; }) {
    await pool.query('UPDATE category SET title = ? WHERE id = ?', [title, id],);
    const category = await this.getById(id);
    return category;
  }
}