import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Users routes', () => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiIkMmIkMTAkS0FQMVpkWVpUMlp5Ynp0OTFyRlgvLnlJVHo3Lmd6bjdsY29HVThOck1ZUjJuZS9GOFcxc3kiLCJpYXQiOjE2NjU3ODA0MTZ9.38DzqgJYt5SzRW4zaA1zD6YGnA0aTGhh97l1iNBuaZ0';

  describe('GET api/users/show/:username?', () => {
    it('Should respond with a 404 status code if valid token but invalid username.', async () => {
      const response = await request
        .get('/api/users/show/23')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(404);
    });

    it('Should respond with a 200 status code if valid token and valid username.', async () => {
      const response = await request
        .get('/api/users/show/john123')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(200);
    });

    it('Should respond with a 400 status code username is not provided in the URL parameter.', async () => {
      const response = await request
        .get('/api/users/show/')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(400);
    });
  });

  describe('GET api/users', () => {
    it('Should respond with a 200 status code if valid token.', async () => {
      const response = await request
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    it('Should respond with a 401 status code if invalid token.', async () => {
      token = '';

      const response = await request
        .get('/api/users')
        .set('Authorization', `Bearer: ${token}`);

      expect(response.status).toEqual(401);
    });
  });

  describe('POST api/users/create', () => {
    it('Should respond with a 400 status code if username already exists.', async () => {
      const body = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'john123',
        password: 'passwo3d',
      };
      const response = await request.post('/api/users/create').send(body);

      expect(response.status).toEqual(400);
    });

    it('Should respond with a 200 if username does not exist.', async () => {
      const body = {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'jane123',
        password: 'passwo3d',
      };
      const response = await request.post('/api/users/create').send(body);

      expect(response.status).toEqual(200);
    });
  });

  describe('POST api/users/authenticate', () => {
    it('Should respond with a 401 status code if invalid credentials.', async () => {
      const body = {
        username: 'john1234',
        password: 'passwo3d',
      };
      const response = await request.post('/api/users/authenticate').send(body);

      expect(response.status).toEqual(401);
    });

    it('Should respond with a 200 status code if valid credentials.', async () => {
      const body = {
        username: 'john123',
        password: 'passwo3d',
      };
      const response = await request.post('/api/users/authenticate').send(body);

      expect(response.status).toEqual(200);
    });
  });
});
