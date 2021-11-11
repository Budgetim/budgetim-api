import { pool } from './db';
import { Currency as CurrencyType } from '../types';

export default class Currency {
  static async get() {
    const currencies = await pool.query(`SELECT * FROM currency`) as unknown as [CurrencyType[]];
    return currencies[0];
  }
}
