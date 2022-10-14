import { Order, OrderStore, Status } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('it should have index method.', () => {
    expect(store.index).toBeDefined();
  });

  it('it should have getOrderById method.', () => {
    expect(store.getOrderById).toBeDefined();
  });

  it('it should have getCurrentOrder method.', () => {
    expect(store.getCurrentOrder).toBeDefined();
  });

  it('it should have a getCompletedOrders method.', () => {
    expect(store.getCompletedOrders).toBeDefined();
  });

  it('it should have createNewOrder method.', () => {
    expect(store.createNewOrder).toBeDefined();
  });

  it('it should have updateActiveOrder method.', () => {
    expect(store.updateActiveOrder).toBeDefined();
  });

  it('it should have addProduct method.', () => {
    expect(store.addProduct).toBeDefined();
  });

  describe('createNewOrder method', () => {
    it('it should create a new order.', async () => {
      const user_Id = 1;

      const result = await store.createNewOrder(user_Id);

      expect(result).toEqual({
        id: 1,
        user_id: '1', //bigint returns a string, all 64-bit integers are returned by the underlying node-postgres driver as type string.
        status: Status.Active,
      });
    });

    it('it should not create a new order if user id does not exist.', async () => {
      const user_Id = 5;

      await expectAsync(store.createNewOrder(user_Id)).toBeRejectedWithError(
        `Unable to create order, error: insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"`
      );
    });
  });

  describe('index method', () => {
    it('it should return an array type.', async () => {
      const user_Id = 1;

      const result = await store.index(user_Id);

      expect(result).toBeInstanceOf(Array);
    });

    it('it should return an array length greater than 0.', async () => {
      const user_Id = 1;

      const result = await store.index(user_Id);

      expect(result.length).toBeGreaterThan(0);
    });

    it('it should return an array of objects, and each object has (id, status, user_id) properties.', async () => {
      const user_id = 1;

      const result = await store.index(user_id);

      expect(result).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({
            id: 1,
            status: Status.Active,
            user_id: '1',
          }),
        ])
      );
    });
  });

  describe('getOrderById method', () => {
    it("it should return a user's specific order.", async () => {
      const user_id = 1;
      const order_id = 1;

      const result: Order = await store.getOrderById(user_id, order_id);

      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
          user_id: '1',
        })
      );
    });

    it('it should return undefined if user_id does not exist.', async () => {
      const user_id = 2;
      const order_id = 1;

      const result = await store.getOrderById(user_id, order_id);

      expect(result).toBeUndefined();
    });

    it('it should return undefined if order_id does not exist.', async () => {
      const user_id = 1;
      const order_id = 2;

      const result = await store.getOrderById(user_id, order_id);

      expect(result).toBeUndefined();
    });
  });

  describe('getCurrentOrder method', () => {
    it("it should return a user's current active order.", async () => {
      const user_id = 1;

      const result = await store.getCurrentOrder(user_id);

      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
          status: Status.Active,
          user_id: '1',
        })
      );
    });

    it('it should return undefined if user id does not exist.', async () => {
      const user_id = 2;

      const result = await store.getCurrentOrder(user_id);

      expect(result).toBeUndefined();
    });
  });

  describe('updateActiveOrder method', () => {
    it("it should update a user's active order.", async () => {
      const user_id = 1;

      const result = await store.updateActiveOrder(user_id);

      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
          status: Status.Complete,
          user_id: '1',
        })
      );
    });

    it('it should return undefined if user id does not exist.', async () => {
      const user_id = 2;

      const result = await store.updateActiveOrder(user_id);

      expect(result).toBeUndefined();
    });
  });

  describe('getCompletedOrders method', () => {
    it("it should return user's completed orders.", async () => {
      const user_id = 1;

      const result = await store.getCompletedOrders(user_id);

      expect(result).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({
            id: 1,
            status: Status.Complete,
            user_id: '1',
          }),
        ])
      );
    });

    it('it should return an empty array if user id does not exist.', async () => {
      const user_id = 2;

      const result = await store.getCompletedOrders(user_id);

      expect(result).toEqual([]);
    });
  });

  describe('addProduct method', () => {
    it('it should return order_products new added row, if order id exists and product id exists.', async () => {
      const quantity = 1;
      const orderId = 1;
      const productId = 1;

      const result = await store.addProduct(quantity, orderId, productId);

      expect(result).toEqual(
        jasmine.objectContaining({
          quantity,
          order_id: String(orderId),
          product_id: String(productId),
        })
      );
    });

    it('it should not add a product to order if order id does not exist.', async () => {
      const quantity = 1;
      const orderId = 0;
      const productId = 1;

      await expectAsync(
        store.addProduct(quantity, orderId, productId)
      ).toBeRejectedWithError(
        `Unable to add product: ${productId} to order: ${orderId}, error: insert or update on table "order_products" violates foreign key constraint "order_products_order_id_fkey"`
      );
    });

    it('it should not add a product to order if product id does not exist.', async () => {
      const quantity = 1;
      const orderId = 1;
      const productId = 0;

      await expectAsync(
        store.addProduct(quantity, orderId, productId)
      ).toBeRejectedWithError(
        `Unable to add product: ${productId} to order: ${orderId}, error: insert or update on table "order_products" violates foreign key constraint "order_products_product_id_fkey"`
      );
    });
  });
});
