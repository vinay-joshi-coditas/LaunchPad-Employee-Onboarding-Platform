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

export class BuddyConversations extends Model<
  InferAttributes<BuddyConversations>,
  InferCreationAttributes<BuddyConversations>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<Users["id"]>;
  declare message: string;
  declare senderType: "USER" | "BUDDY";
  declare actionExecuted: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

BuddyConversations.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => crypto.randomUUID(),
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Users, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderType: {
      type: DataTypes.ENUM("USER", "BUDDY"),
      allowNull: false,
    },
    actionExecuted: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "buddy_conversations",
    timestamps: true,
  },
);
