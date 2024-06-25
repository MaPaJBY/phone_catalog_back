import bodyParser from "body-parser";
import { sequelize } from "./models";
import cors from "cors";
import Product from "./models/product";
import express, { Application, Request, Response } from 'express';
import { handleErrors } from "./utils/handleErrors";


const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.get("/products", async (request, response) => {
  try {
    const page: number = parseInt(request.query.page as string, 10) || 1;
    const limit: number = parseInt(request.query.limit as string, 10) || 16;

    if (page < 1 || limit < 1) {
      response.status(404).json({
        errType: "404",
        msg: "Invalid page or limit parameters",
      })
    }

    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      offset,
      limit,
    });

    response.json({
      page,
      limit,
      total: products.count,
      products: products.rows,
    });
  } catch (error) {
    handleErrors(response, error);
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });