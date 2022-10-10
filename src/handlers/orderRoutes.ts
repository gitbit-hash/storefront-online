import { Request, Response, Router } from 'express';

import { auth } from '../middlewares/auth';
import { Order, OrderStore } from '../models/order';
import { validateBodyKeys } from '../utils/validators';
import { Product, ProductStore } from '../models/product';

const orderStore = new OrderStore();
const productStore = new ProductStore();

const index = async (_: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.verifiedUser;

    const orders: Order[] = await orderStore.index(userId);

    if (orders.length > 0) {
      return res.json(orders);
    } else {
      return res.status(404).json('orders not found!');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  const { order_id } = req.params;

  const { id: userId } = res.locals.verifiedUser;

  if (!order_id || Number.isNaN(Number(order_id))) {
    return res.status(400).json('Please provide a valid order id parameter.');
  }

  try {
    const order: Order = await orderStore.getOrderById(order_id, userId);

    if (order) {
      return res.json(order);
    } else {
      return res.status(404).json('order not found!.');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const getCurrentOrder = async (_: Request, res: Response) => {
  const { id: userId } = res.locals.verifiedUser;

  try {
    const order: Order = await orderStore.getCurrentOrder(userId);

    if (order) {
      return res.json(order);
    } else {
      return res.status(404).json('No active order has found!.');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const getCompletedOrders = async (_: Request, res: Response) => {
  const { id: userId } = res.locals.verifiedUser;

  try {
    const completedOrders: Order[] = await orderStore.getCompletedOrders(
      userId
    );

    if (completedOrders.length) {
      return res.json(completedOrders);
    } else {
      return res.status(404).json('No completed orders have been found!.');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const createNewOrder = async (_: Request, res: Response) => {
  const { id: userId } = res.locals.verifiedUser;

  try {
    const activeOrder = await orderStore.getCurrentOrder(userId);
    if (activeOrder) {
      return res.status(400).json({
        error:
          'Could not create new order!, please complete your current active order before creating a new one.',
      });
    }
    const order: Order = await orderStore.createNewOrder(userId);

    if (order) {
      return res.json(order);
    } else {
      return res.status(400).json({ error: 'Could not create new order!.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const updateActiveOrder = async (_: Request, res: Response) => {
  const { id: userId } = res.locals.verifiedUser;

  try {
    const activeOrder = await orderStore.getCurrentOrder(userId);

    if (!activeOrder) {
      return res
        .status(400)
        .json({ error: 'No active order has been found!.' });
    }

    const completeOrder: Order = await orderStore.updateActiveOrder(userId);

    if (completeOrder) {
      return res.json(completeOrder);
    } else {
      return res.status(400).json({ error: 'Could not complete order!.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { productId, quantity } = req.body;

  const { id: userId } = res.locals.verifiedUser;

  if (!order_id || Number.isNaN(Number(order_id))) {
    return res
      .status(400)
      .json('Please provide a valid active order id parameter.');
  }

  const { isValidPropertyKey, error } = validateBodyKeys(req.body, 2, [
    'productId',
    'quantity',
  ]);

  if (!isValidPropertyKey) {
    return res.status(400).json({ error });
  }

  try {
    const activeOrder = await orderStore.getCurrentOrder(userId);

    if (!activeOrder) {
      return res
        .status(400)
        .json({ error: 'No active order has been found!.' });
    }

    const activeOrderId = activeOrder.id;

    if (activeOrderId != order_id) {
      return res.status(404).json({
        error:
          'No active order, please provide an active order id, and make sure that you have an active order.',
      });
    }

    const product: Product = await productStore.show(productId);

    if (!product) {
      return res.status(400).json({
        error: "Product doesn't exist, please provide an existing product id.",
      });
    }

    if (!quantity || Number.isNaN(Number(quantity)) || quantity < 1) {
      return res
        .status(400)
        .json(
          'Please provide a valid quantity value. quantity value must be at least 1.'
        );
    }

    const addedProduct = await orderStore.addProduct(
      quantity,
      order_id,
      productId
    );

    if (addedProduct) {
      return res.json(addedProduct);
    } else {
      return res.status(400).json({ error: 'Could not add product!.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const router = Router();

router.get('/', auth, index);
router.get('/active', auth, getCurrentOrder);
router.get('/complete', auth, getCompletedOrders);
router.get('/:order_id?', auth, getOrderById);
router.put('/update', auth, updateActiveOrder);
router.post('/', auth, createNewOrder);
router.post('/:order_id/products', auth, addProduct);

export default router;
