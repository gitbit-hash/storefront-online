import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
  it('it should have index method.', () => {
    expect(store.index).toBeDefined();
  });

  it('it should have show method.', () => {
    expect(store.show).toBeDefined();
  });

  it('it should have createProduct method.', () => {
    expect(store.createProduct).toBeDefined();
  });

  it('it should have getProductsByCategory method.', () => {
    expect(store.getProductsByCategory).toBeDefined();
  });

  describe('createProduct method', () => {
    it('it should return a databse new product row.', async () => {
      const result: Product = await store.createProduct({
        name: 'Iphone 14',
        price: 500,
      });

      expect(result).toEqual(
        jasmine.objectContaining({
          name: 'Iphone 14',
          price: 500,
          category: null,
        })
      );
    });
  });

  describe('index method', () => {
    it('it should return databse products.', async () => {
      const result: Product[] = await store.index();

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('show method', () => {
    it('it should return a single product if the product id exists.', async () => {
      const result = await store.show(1);

      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
        })
      );
    });

    it('it should return undefined if the product id does not exist.', async () => {
      const result = await store.show(2);

      expect(result).toBeUndefined();
    });
  });

  describe('getProductsByCategory method', () => {
    it('it should return an empty array if the category name does not exist.', async () => {
      const result = await store.getProductsByCategory('');

      expect(result).toEqual([]);
    });

    it('it should return an array of products if the category name exists.', async () => {
      await store.createProduct({
        name: 'Iphone 13',
        price: 200,
        category: 'Phones',
      });

      const result = await store.getProductsByCategory('Phones');

      expect(result).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({
            name: 'Iphone 13',
            price: 200,
            category: 'Phones',
          }),
        ])
      );
    });
  });
});
