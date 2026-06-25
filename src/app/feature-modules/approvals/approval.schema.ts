import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";
import { Users } from "../users/user.schema.js";
import { Tasks } from "../tasks/task.schema.js";

export class Approvals extends Model<
  InferAttributes<Approvals>,
  InferCreationAttributes<Approvals>
> {
  declare id: CreationOptional<string>;
  declare taskId: ForeignKey<Tasks["id"]>;
  declare approverId: ForeignKey<Users["id"]>;
  declare status: CreationOptional<"PENDING" | "APPROVED" | "REJECTED">;
  declare comments: CreationOptional<string | null>;
  declare actionAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<string>;
  declare updatedBy: CreationOptional<string>;
}

Approvals.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => crypto.randomUUID(),
      primaryKey: true,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Tasks, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    approverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Users, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    actionAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Users, key: "id" },
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Users, key: "id" },
    }
  },
  {
    sequelize,
    tableName: "approvals",
    timestamps: true,
  },
);
