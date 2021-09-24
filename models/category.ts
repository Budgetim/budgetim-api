import { pool } from './db';

export default class Category {
  static async get() {
    const categories: any = await pool.query(`SELECT id, title FROM category`);
    return categories[0];
  }
}