import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

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

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to Storefront-online store');
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
