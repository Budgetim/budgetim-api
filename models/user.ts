import bcrypt from 'bcrypt';

import { pool } from './db';
import { UserWithoutId, User as UserType, CurrencyInfoForUser } from '../types';

export const getUserDetails = (user?: UserType & CurrencyInfoForUser) => {
  if (!user) {
    return null;
  }
  const { currencyId, currencyTitle, currencyUnit, ...other } = user;
  return {
    ...other,
    currency: {
      id: currencyId,
      title: currencyTitle,
      unit: currencyUnit,
    },
  } as UserType;
}

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

    await pool.query(`
      UPDATE client SET password = ?
      WHERE id = ?`,
      [hash, id],
    );

    const user = await this.findById({ id });
    return user;
  }

  static async updateCurrency({ id, currencyId }: { id: number; currencyId: number }) {
    await pool.query(`
      UPDATE client SET currency_id = ?
      WHERE id = ?`,
      [currencyId, id],
    );

    const user = await this.findById({ id });
    return user;
  }

  static async findByEmail({ email }: { email: string }) {
    const result = await pool.query(`
      SELECT client.id, client.name, client.email, client.password, currency.id AS currencyId, currency.title AS currencyTitle, currency.unit AS currencyUnit
      FROM client
      LEFT JOIN currency ON client.currency_id = currency.id
      WHERE client.email = ?`,
      [email],
    ) as unknown as [[UserType & CurrencyInfoForUser]];
    const user = result[0][0];

    return getUserDetails(user);
  }

  static async findById({ id }: { id: number }) {
    const result = await pool.query(`
      SELECT client.id, client.name, client.email, client.password, currency.id AS currencyId, currency.title AS currencyTitle, currency.unit AS currencyUnit
      FROM client
      LEFT JOIN currency ON client.currency_id = currency.id
      WHERE client.id = ?`,
      [id],
    ) as unknown as [[UserType & CurrencyInfoForUser]];
    const user = result[0][0];
    return getUserDetails(user);
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