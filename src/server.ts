import express, { Application } from 'express';

import accessoryRouter from './routes/accessories.route';
import bodyParser from 'body-parser';
import cors from 'cors';
import phoneRouter from './routes/phones.route';
import productRouter from './routes/products.router';
import { sequelize } from './models';
import tabletRouter from './routes/tablets.route';
import userRouter from './routes/users.router';

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

sequelize
  .sync()
  .then(() => {
    app.use('/products', productRouter);
    app.use('/tablets', tabletRouter);
    app.use('/accessories', accessoryRouter);
    app.use('/phones', phoneRouter);
    app.use('/users', userRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
