import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { pool } from './db';
import secret from '../config/secret';

export default class User {
  static async create({ name, email, password }: { name: string; email: string; password: string }) {
    const hash = await bcrypt.hash(password, 10);

    // TODO: проверка нет ли такого пользоавтеля с таким email
    const res: any = await pool.query(
      'insert into client (name, email, password) values (?, ?, ?)',
      [name, email, hash],
    );

    return res;
  }

  static omitPassword(user) {
    const { password, ...restUser } = user;
    return restUser;
  }

  static async authenticate({ email, password }: { email: string; password: string }) {
    const res = await pool.query(`
    SELECT id, name, email, password FROM client 
    WHERE ?? = ?`,
      ['email', email]
    );

    const user = res[0][0];

    const access = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

    if (access) {
      return { ...this.omitPassword(user), token };
    }
    return {};
  }
}