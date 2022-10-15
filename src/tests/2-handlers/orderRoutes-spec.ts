import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Order routes', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiIkMmIkMTAkS0FQMVpkWVpUMlp5Ynp0OTFyRlgvLnlJVHo3Lmd6bjdsY29HVThOck1ZUjJuZS9GOFcxc3kiLCJpYXQiOjE2NjU3ODA0MTZ9.38DzqgJYt5SzRW4zaA1zD6YGnA0aTGhh97l1iNBuaZ0';

  describe('GET api/orders/', () => {
    it("Should respond with a 200 status code if user's orders was found.", async () => {
      const response = await request
        .get('/api/orders')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });
  });

  describe('GET api/orders/:order_id?', () => {
    it("Should respond with a 200 status code if user's exisiting order id was provided and is valid.", async () => {
      const response = await request
        .get('/api/orders/1')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });

    it('Should respond with a 400 status code if order id is invalid.', async () => {
      const response = await request
        .get('/api/orders/notValid')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 404 status code if order id is valid but not exist.', async () => {
      const response = await request
        .get('/api/orders/9999')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(404);
    });
  });

  describe('GET api/orders/active', () => {
    it('Should respond with a 404 status code if user does not have an active order.', async () => {
      const response = await request
        .get('/api/orders/active')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(404);
    });
  });

  describe('POST api/orders/', () => {
    it('Should respond with a 200 status code if user does not have an active order.', async () => {
      const response = await request
        .post('/api/orders/')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });
  });

  describe('GET api/orders/active', () => {
    it('Should respond with a 200 status code if user has an active order.', async () => {
      const response = await request
        .get('/api/orders/active')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });
  });

  describe('POST api/orders/:order_id/products', () => {
    it('Should respond with a 400 status code if user does not provide order id, or provided an invalid id.', async () => {
      const response = await request
        .post('/api/orders/invalid_order_id/products')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 400 status code if invalid body property key(s).', async () => {
      const invalidBodyPropertyKeys = {
        invalidId: 1,
        invalidQuantatiy: 1,
      };
      const response = await request
        .post('/api/orders/1/products')
        .send(invalidBodyPropertyKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 404 status code if the provided order id does not equal to an active order id.', async () => {
      const validPropertKeys = {
        productId: 1,
        quantity: 1,
      };
      const response = await request
        .post('/api/orders/1000/products')
        .send(validPropertKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(404);
    });

    it('Should respond with a 400 status code if the provided productId does not exist.', async () => {
      const validPropertKeys = {
        productId: 1000,
        quantity: 1,
      };
      const response = await request
        .post('/api/orders/3/products')
        .send(validPropertKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 400 status code if the provided quantity invalid.', async () => {
      const validPropertKeys = {
        productId: 1,
        quantity: -1,
      };
      const response = await request
        .post('/api/orders/3/products')
        .send(validPropertKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 200 status code if valid body properties and valid active order id.', async () => {
      const validPropertKeys = {
        productId: 1,
        quantity: 1,
      };
      const response = await request
        .post('/api/orders/3/products')
        .send(validPropertKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });
  });

  describe('POST api/orders/update', () => {
    it('Should respond with a 200 status code if user has an active order.', async () => {
      const response = await request
        .put('/api/orders/update')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });
  });

  describe('POST api/orders/:order_id/products', () => {
    it('Should respond with a 400 status code if user does not have an active', async () => {
      const validPropertKeys = {
        productId: 1,
        quantity: 1,
      };
      const response = await request
        .post('/api/orders/3/products')
        .send(validPropertKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });
  });

  describe('GET api/orders/complete', () => {
    it('Should respond with a 200 status code if user has completed orders.', async () => {
      const response = await request
        .get('/api/orders/complete')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });
  });
});
