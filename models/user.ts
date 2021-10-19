import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { pool } from './db';
import secret from '../config/secret';
import { UserWithoutId, User as UserType } from '../types';

export default class User {
  static async create({ name, email, password }: UserWithoutId) {
    const hash = await bcrypt.hash(password, 10);

    // TODO: проверка нет ли такого пользоавтеля с таким email

    const res = await pool.query(`
      INSERT INTO client (name, email, password)
      VALUES (?, ?, ?)`,
      [name, email, hash],
    );

    return res;
  }

  static omitPassword(user: UserType) {
    const { password, ...restUser } = user;
    return restUser;
  }

  static async authenticate({ email, password }: { email: UserType['email']; password: UserType['password']; }) {
    const res = await pool.query(`
      SELECT id, name, email, password FROM client 
      WHERE ?? = ?`,
      ['email', email]
    ) as unknown as [[UserType]];

    const user = res[0][0];

    const access = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '30d' });

    if (access) {
      return { ...this.omitPassword(user), token };
    }
    return {};
  }
}