import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: string;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();

      const sqlQuery = 'SELECT * FROM products';

      const result = await conn.query(sqlQuery);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products, ${err}.`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();

      const sqlQuery = 'SELECT * FROM products WHERE id=($1)';

      const result = await conn.query(sqlQuery, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get product, ${err}.`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const { name, price, category } = product;

      const conn = await client.connect();

      const sqlQuery =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sqlQuery, [name, price, category]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create product, ${err}.`);
    }
  }

  async getProductsByCategory(gategoryName: string): Promise<Product[]> {
    try {
      const conn = await client.connect();

      const sqlQuery = 'SELECT * FROM products WHERE LOWER(category)=LOWER($1)';

      const result = await conn.query(sqlQuery, [gategoryName]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to create products, ${err}.`);
    }
  }
}
