import { pool } from './db';

export default class Categories {
  static async get() {
    const categories = await pool.query('select * from categories');
    return categories;
  }

  static async add({ title, description }: { title: string; description: string }) {
    const res = await pool.query(
      'insert into categories (title, description) values (?, ?)',
      [title, description],
    );
    return res;
  }

  static async delete(id: number) {
    const res = await pool.query('delete from categories where ?? = ?', ['id', id])
    return res;
  }

  static async edit({ id, title, description }: { id: number; title: string; description: string }) {
    const res = await pool.query('update categories set title = ?, description = ? where id = ?', [title, description, id],);
    return res;
  }
}
