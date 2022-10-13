import { User, UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
  it('it should have index method.', () => {
    expect(store.index).toBeDefined();
  });

  it('it should have show method.', () => {
    expect(store.show).toBeDefined();
  });

  it('it should have createNewUser method.', () => {
    expect(store.createNewUser).toBeDefined();
  });

  it('it should have authenticate method.', () => {
    expect(store.authenticate).toBeDefined();
  });

  describe('createNewUser method.', () => {
    it('it should create a new user', async () => {
      const result: User = await store.createNewUser({
        firstName: 'John',
        lastName: 'Doe',
        username: 'john123',
        password: 'passwo3d',
      });

      expect(result).toEqual(
        jasmine.objectContaining({
          first_name: 'John',
          last_name: 'Doe',
          username: 'john123',
        })
      );
    });
  });

  describe('index method', () => {
    it('it should return an array which its length should be greater than 0.', async () => {
      const result: User[] = await store.index();

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('show method', () => {
    it('it should return username if user exists in the database.', async () => {
      const usernameArgument = 'john123';

      const result = await store.show(usernameArgument);

      expect(result).toEqual({ username: usernameArgument });
    });

    it('it should return undefined if user does not exist in the database.', async () => {
      const usernameParameter = 'john12';

      const result = await store.show(usernameParameter);

      expect(result).toBeUndefined();
    });
  });

  describe('authenticate method', () => {
    it('it should return user if user exists in the database.', async () => {
      const usernameArgument = 'john123';

      const userPassword = 'passwo3d';

      const result = await store.authenticate(usernameArgument, userPassword);

      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
        })
      );
    });

    it('it should return null if user does not exist in the database.', async () => {
      const usernameArgument = 'john12';

      const userPassword = 'passwo3d';

      const result = await store.authenticate(usernameArgument, userPassword);

      expect(result).toBeNull();
    });
  });
});
