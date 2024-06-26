import { Model, Sequelize, DataTypes } from "sequelize";
import { OrderProduct } from "../utils/types";

class Order extends Model {
  public id!: number;
  public userId!: string;
  public totalAmount!: number;
  public products!: OrderProduct[];

  static initialize(sequelize: Sequelize): void {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      products: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders',
    });
  }
}

export default Order;