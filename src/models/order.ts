import client from '../database';

export enum Status {
  Active = 'active',
  Complete = 'complete',
}

export type Order = {
  id?: number;
  user_id: string;
  status?: Status;
};

export class OrderStore {
  async index(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();

      const sqlQuery = 'SELECT * FROM orders WHERE user_id=($1)';

      const result = await conn.query(sqlQuery, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get orders, ${err}`);
    }
  }

  async getOrderById(orderId: number, userId: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const sqlQuery = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';

      const result = await conn.query(sqlQuery, [orderId, userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get order, ${err}`);
    }
  }

  async getCurrentOrder(userId: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const sqlQuery =
        'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';

      const result = await conn.query(sqlQuery, [userId, Status.Active]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get order, ${err}`);
    }
  }

  async getCompletedOrders(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();

      const sqlQuery =
        'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';

      const result = await conn.query(sqlQuery, [userId, Status.Complete]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get order, ${err}`);
    }
  }

  async createNewOrder(userId: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const sqlQuery =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sqlQuery, [userId, Status.Active]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order, ${err}`);
    }
  }

  async updateActiveOrder(userId: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const sqlQuery =
        'UPDATE orders SET status=($1) WHERE user_id=($2) RETURNING *';

      const result = await conn.query(sqlQuery, [Status.Complete, userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to update order, ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: number, productId: number) {
    try {
      const conn = await client.connect();

      const sqlQuery =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sqlQuery, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to add product: ${productId} to order: ${orderId}, ${err}`
      );
    }
  }
}
