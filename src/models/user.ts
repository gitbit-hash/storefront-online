import 'dotenv/config';
import bcrypt from 'bcrypt';

import client from '../database';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();

      const sqlQuery = 'SELECT username FROM users';

      const result = await conn.query(sqlQuery);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Couuld not users, ${err}`);
    }
  }

  async show(username: string): Promise<{ username: string } | undefined> {
    try {
      const conn = await client.connect();

      const sqlQuery =
        'SELECT username FROM users WHERE LOWER(username)=LOWER($1)';

      const result = await conn.query(sqlQuery, [username]);

      conn.release();

      return result.rows[0] || undefined;
    } catch (err) {
      throw new Error(`Couuld not user, ${err}`);
    }
  }

  async createNewUser(newUser: User): Promise<User> {
    try {
      const conn = await client.connect();

      const { firstName, lastName, username, password } = newUser;

      const sqlQuery =
        'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';

      const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
      const pepper = process.env.BCRYPT_PASSWORD as string;

      const hashedPassword = await bcrypt.hash(password + pepper, saltRounds);

      const result = await conn.query(sqlQuery, [
        firstName,
        lastName,
        username,
        hashedPassword,
      ]);

      const user: User = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Couuld not create user, ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<{ id: string; password: string } | null> {
    const conn = await client.connect();

    const sqlQuery =
      'SELECT id, password FROM users WHERE LOWER(username)=LOWER($1)';

    const result = await conn.query(sqlQuery, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      const pepper = process.env.BCRYPT_PASSWORD as string;

      const isMatched = await bcrypt.compare(password + pepper, user.password);

      if (isMatched) {
        return user;
      }
    }

    return null;
  }
}
