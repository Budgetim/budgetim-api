import { pool } from './db';

export default class User {
  static async createUser({ email, password }: { email: string; password: string }) {
    const newUser = await pool.query('INSERT INTO users(email, password) VALUES (?, ?)', [email, password]);
    return newUser;
  }

  static async findUserByEmail(email: string): Promise<{ email: string; password: string }> {
    const users: any[] = await pool.query('SELECT * from users WHERE email = ?', [email]);
    const user = users && users.length > 0 && users[0].length > 0 && users[0][0];
    return user;
  }

  static checkPassword(user: { email: string; password: string }, password: string) {
    return password === user.password;
  }
}
