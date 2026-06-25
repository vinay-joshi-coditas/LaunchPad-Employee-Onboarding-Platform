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


export class Documents extends Model<
  InferAttributes<Documents>,
  InferCreationAttributes<Documents>
> {
  declare id: CreationOptional<string>;
  declare taskId: ForeignKey<Tasks["id"]>;
  declare uploadedBy: ForeignKey<Users["id"]>;
  declare fileName: string;
  declare mimeType: CreationOptional<string>;
  declare fileSize: CreationOptional<number>;
  declare s3Key: string;
  declare status: CreationOptional<"PENDING" | "APPROVED" | "REJECTED">;
  declare reviewedBy: CreationOptional<ForeignKey<Users["id"]> | null>;
  declare reviewedAt: CreationOptional<Date | null>;
  declare rejectionReason: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<string>;
  declare updatedBy: CreationOptional<string>;
}

Documents.init(
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
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Users, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    s3Key: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    reviewedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: { model: Users, key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    rejectionReason: {
      type: DataTypes.TEXT,
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
    },
  },
  {
    sequelize,
    tableName: "documents",
    timestamps: true,
  },
);
