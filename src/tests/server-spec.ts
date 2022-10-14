import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('GET /', () => {
  it('responds with 200 status code', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });

  it('responds with html', async () => {
    await request.get('/').expect('Content-Type', /html/);
  });

  it('responds with (Welcome to Storefront-online store)', async () => {
    const welcomeMessage = 'Welcome to Storefront-online store';

    const responseText = (await request.get('/')).text;

    expect(responseText).toEqual(welcomeMessage);
  });
});
