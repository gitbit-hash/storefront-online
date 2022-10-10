import { Request, Response, Router } from 'express';

import { DashboardQueries } from '../services/dashboard';

import { Product } from '../models/product';

const dashboard = new DashboardQueries();

const getTop5Products = async (_: Request, res: Response) => {
  try {
    const products: Product[] = await dashboard.getTopFiveProducts();

    if (products.length > 0) {
      return res.json(products);
    } else {
      return res.status(404).json('Top 5 products not found!.');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const router = Router();

router.get('/top_five_products', getTop5Products);

export default router;
