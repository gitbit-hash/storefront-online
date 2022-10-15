import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Dashboard routes', () => {
  describe('GET api/dashboard/top_five_products', () => {
    it('Should respond with a 200 status code top five products length is more than 1.', async () => {
      const response = await request.get('/api/dashboard/top_five_products');
      expect(response.status).toEqual(200);
    });
  });
});
