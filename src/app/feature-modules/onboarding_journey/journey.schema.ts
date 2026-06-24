import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import type { Users } from "../users/user.schema.js";
import { sequelize } from "../../connections/pg.connection.js";

export class Journey extends Model<
  InferAttributes<Journey>,
  InferCreationAttributes<Journey>
> {
  declare id: CreationOptional<string>;
  declare newHireId: ForeignKey<Users["id"]>;
  declare status: string;
  declare startDate: CreationOptional<Date>;
  declare completedAt: CreationOptional<Date>;
  declare progress_percentage: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<string>;
  declare updatedBy: CreationOptional<string>;
}

Journey.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => crypto.randomUUID(),
      primaryKey: true,
      allowNull: false,
    },
    newHireId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("Pending", "InProgress", "Completed"),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    progress_percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      allowNull: true,
      type: DataTypes.UUID,
      references: { model: "users", key: "id" },
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.UUID,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "onboarding_journey",
    timestamps: true,
  },
);
