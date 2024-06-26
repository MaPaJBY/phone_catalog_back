import express, { Application } from "express";

import accessoryRouter from "./routes/accessories.router";
import bodyParser from "body-parser";
import phoneRouter from "./routes/phones.router";
import productRouter from "./routes/products.router";
import { sequelize } from "./models";
import tabletRouter from "./routes/tablets.router";
import orderRouter from "./routes/order.router";
import Order from "./models/order";

const app: Application = express();

app.use(bodyParser.json());

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

Order.initialize(sequelize);

sequelize
  .sync()
  .then(() => {
    app.use("/products", productRouter);
    app.use("/tablets", tabletRouter);
    app.use("/accessories", accessoryRouter);
    app.use("/phones", phoneRouter);
    app.use("/orders", orderRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });
