import bcrypt from 'bcrypt';

import { pool } from './db';
import { UserWithoutId, User as UserType } from '../types';


export default class User {
  static async create({ name, email, password }: UserWithoutId) {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(`
      INSERT INTO client (name, email, password)
      VALUES (?, ?, ?)`,
      [name, email, hash],
    );

    const user = await this.findByEmail({ email });
    return user;
  }

  static async updatePassword({ id, password }: { id: number; password: string }) {
    const hash = await bcrypt.hash(password, 10);

    const res = await pool.query(`
      UPDATE client SET password = ?
      WHERE id = ?`,
      [hash, id],
    );

    return res;
  }

  static async findByEmail({ email }: { email: string }) {
    const result = await pool.query(`
      SELECT * FROM client
      WHERE email = ?`,
      [email],
    ) as unknown as [[UserType]];
    const user = result[0][0];
    return user;
  }

  static async findById({ id }: { id: number }) {
    const result = await pool.query(`
      SELECT * FROM client
      WHERE id = ?`,
      [id],
    ) as unknown as [[UserType]];
    const user = result[0][0];
    return user;
  }

  static omitPassword(user: UserType) {
    const { password, ...restUser } = user;
    return restUser;
  }

  static async setVerified({ id }: { id: number }) {
    const res = await pool.query(`
      UPDATE client SET verified = 1
      WHERE id = ?`,
      [id],
    );
    return res;
  }
}