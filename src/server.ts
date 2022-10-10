import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';

import dashboardRoutes from './handlers/dashboardRoutes';
import productRoutes from './handlers/productRoutes';
import userRoutes from './handlers/usersRoutes';
import orderRoutes from './handlers/orderRoutes';

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: `${process.env.ORIGIN}:${port}`,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan('dev'));

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to Storefront-online store');
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
