import { pool } from './db';

export default class Task {
  static async logIn(email: string, password: string) {
    const res = await pool.query('select * from users where ?? = ?', ['email', email])
    if (res && res.length > 0) {
      const user = res[0];
      return user;
    }
    return false;
  }
}
