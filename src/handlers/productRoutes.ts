import { Request, Response, Router } from 'express';

import { auth } from '../middlewares/auth';
import { trim } from '../middlewares/trim';
import { Product, ProductStore } from '../models/product';
import { validateBodyValues, validateBodyKeys } from '../utils/validators';

const store = new ProductStore();

const index = async (_: Request, res: Response) => {
  try {
    const products: Product[] = await store.index();

    if (products.length > 0) {
      return res.json(products);
    } else {
      return res.status(404).json('Products not found!.');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const show = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  if (!product_id || Number.isNaN(Number(product_id))) {
    return res.status(400).json('Please provide a valid product_id parameter.');
  }

  try {
    const productIdInteger = parseInt(product_id);
    const product: Product = await store.show(productIdInteger);

    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json('Product not found!.');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;

  const { isValidPropertyKey, error: propertyKeyError } = validateBodyKeys(
    req.body,
    2,
    ['name', 'price'],
    ['category']
  );
  if (!isValidPropertyKey) {
    return res.status(400).json({ error: propertyKeyError });
  }

  const { isValidPropertyValue, error: propertyValueError } =
    validateBodyValues(req.body);
  if (!isValidPropertyValue) {
    return res.status(400).json({ error: propertyValueError });
  }

  try {
    const product: Product = await store.createProduct({
      name,
      price,
      category,
    });

    if (product) {
      return res.json(product);
    } else {
      return res.status(400).json({ error: 'Could not create new product!.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const getProductsByGategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;
  try {
    if (categoryName) {
      const products: Product[] = await store.getProductsByCategory(
        categoryName
      );

      if (products.length > 0) {
        return res.json(products);
      } else {
        return res
          .status(404)
          .json(`No products have been found related to '${categoryName}'.`);
      }
    } else {
      return res.status(400).json(`Please provide a category name.`);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!.' });
  }
};

const router = Router();

router.get('/', index);
router.get('/show/:product_id?', show);
router.get('/category/:categoryName?', getProductsByGategory);
router.post('/create', auth, trim, create);

export default router;
