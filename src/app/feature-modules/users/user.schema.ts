import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";

export class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare manager_id: ForeignKey<Users["id"]>;
  declare password_version: number;
  declare isActive: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<string>;
  declare updatedBy: CreationOptional<string>;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => crypto.randomUUID(),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null
    },
    role: {
      type: DataTypes.ENUM("Joinee", "HR", "Manager"),
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Users, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "SET NULL",
    },
    password_version: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
      references: { model: Users, key: "id" },
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.UUID,
      references: { model: Users, key: "id" },
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);
