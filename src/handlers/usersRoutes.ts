import { Request, Response, Router } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { auth } from '../middlewares/auth';
import { trim } from '../middlewares/trim';
import { User, UserStore } from '../models/user';
import { validateBodyKeys, validateBodyValues } from '../utils/validators';

const store = new UserStore();

const index = async (_: Request, res: Response) => {
  try {
    const users: User[] = await store.index();

    if (users) {
      return res.json(users);
    } else {
      return res.status(404).json({ error: 'users not found!' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};

const show = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json('Please provide a username parameter');
  }

  const trimUsername = username.trim();

  try {
    const user: { username: string } | undefined = await store.show(
      trimUsername
    );

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json('user not found!');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};

const create = async (req: Request, res: Response) => {
  const { firstName, lastName, username, password } = req.body;

  const existingUser = await store.show(username);

  if (existingUser) {
    return res.status(400).json({ error: 'username already taken' });
  }

  const { isValidPropertyKey, error: propertyKeyError } = validateBodyKeys(
    req.body,
    4,
    ['firstName', 'lastName', 'username', 'password']
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
    const user: User = await store.createNewUser({
      firstName,
      lastName,
      username,
      password,
    });

    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET as string);

      return res.json(token);
    } else {
      return res.status(400).json({ error: 'Could not create new user!' });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { isValidPropertyKey, error } = validateBodyKeys(req.body, 2, [
    'username',
    'password',
  ]);

  if (!isValidPropertyKey) {
    return res.status(400).json({ error });
  }

  try {
    const user: { id: string; password: string } | null =
      await store.authenticate(username, password);

    if (!user) {
      return res.status(401).json('Invalid credentials.');
    }

    const token = jwt.sign(user, process.env.JWT_SECRET as string);

    return res.json(token);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};

const router = Router();

router.get('/', auth, index);
router.get('/show/:username?', auth, show);
router.post('/create', trim, create);
router.post('/authenticate', trim, authenticate);

export default router;
