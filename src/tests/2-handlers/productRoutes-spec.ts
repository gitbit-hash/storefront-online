import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Product routes', () => {

  describe('GET api/products/', () => {
    it('Should respond with a 200 status code.', async () => {
      const response = await request
        .get('/api/products/')

      expect(response.status).toEqual(200);
    });
  });

  describe('GET api/products/show/:product_id?', () => {
    it('Should respond with a 400 status code if no product id, or invalid product id.', async () => {
      const response = await request
        .get('/api/products/show/')

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 404 status code if product id does not exist.', async () => {
      const response = await request
        .get('/api/products/show/4')

      expect(response.status).toEqual(404);
    });

    it('Should respond with a 200 status code if valid product id.', async () => {

      const response = await request
        .get('/api/products/show/1')

      expect(response.status).toEqual(200);
    });
  });

  describe('POST api/products/create', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiIkMmIkMTAkS0FQMVpkWVpUMlp5Ynp0OTFyRlgvLnlJVHo3Lmd6bjdsY29HVThOck1ZUjJuZS9GOFcxc3kiLCJpYXQiOjE2NjU3ODA0MTZ9.38DzqgJYt5SzRW4zaA1zD6YGnA0aTGhh97l1iNBuaZ0';

    it('Should respond with a 200 status code if valid body properties', async () => {
      const validBody = {
        name: 'Samsung S500', price: 500, category: 'Phones'
      }

      const response = await request
        .post('/api/products/create')
        .send(validBody)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });

    it('Should respond with a 400 status code if invalid body property key(s)', async () => {
      const invalidBodyKeys = {
        namee: 'Samsung S500', pricee: 500, categorye: 'Phones'
      }
      const response = await request
        .post('/api/products/create')
        .send(invalidBodyKeys)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 400 status code if invalid body property value(s)', async () => {
      const invalidBodyKey = {
        name: '', price: 'NaN', category: '£a'
      }
      const response = await request
        .post('/api/products/create')
        .send(invalidBodyKey)
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 401 status code if invalid Authorization header was not provided', async () => {
      const validBody = {
        name: 'Samsung S500', price: 500, category: 'Phones'
      }

      const response = await request
        .post('/api/products/create')
        .send(validBody)

      expect(response.status).toEqual(401);
    });

    describe('GET api/products/category/:categoryName?', () => {
      it('Should respond with a 200 status code if a valid categoryName parameter.', async () => {
        const response = await request
          .get('/api/products/category/phones')

        expect(response.status).toEqual(200);
      });

      it('Should respond with a 400 status code if categoryName parameter was not provided.', async () => {
        const response = await request
          .get('/api/products/category/')

        expect(response.status).toEqual(400);
      });

      it('Should respond with a 404 status code if categoryName parameter does not exist.', async () => {
        const response = await request
          .get('/api/products/category/cars')

        expect(response.status).toEqual(404);
      });
    });

  });

});
