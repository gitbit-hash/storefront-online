import { Product } from '../../models/product';
import { DashboardQueries } from '../../services/dashboard';


const store = new DashboardQueries();

describe('User Model', () => {
  it('it should have index method.', () => {
    expect(store.getTopFiveProducts).toBeDefined();
  });

  describe('getTopFiveProducts method.', () => {
    it('it should return an array of top purchased products', async () => {
      const result: Product[] = await store.getTopFiveProducts();

      expect(result.length).toBeGreaterThan(0)
    });
  });

});
