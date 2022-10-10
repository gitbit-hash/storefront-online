import client from '../database';
import { Product } from '../models/product';

export class DashboardQueries {
  async getTopFiveProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();

      // SQL query to get top 5 purchased products based on top most quantity, where order is completed.
      const sqlQuery =
        "SELECT name FROM products INNER JOIN order_products ON products.id = order_products.product_id INNER JOIN orders ON order_products.order_id = orders.id WHERE status='complete' ORDER BY quantity DESC LIMIT 5";

      const result = await conn.query(sqlQuery);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get top most 5 purchased products, ${err}.`);
    }
  }
}
