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
import { OnboardingJourneys } from "../onboarding_journey/journey.schema.js";

export class Tasks extends Model<
  InferAttributes<Tasks>,
  InferCreationAttributes<Tasks>
> {
  declare id: CreationOptional<string>;
  declare journeyId: ForeignKey<OnboardingJourneys["id"]>;
  declare title: string;
  declare description: CreationOptional<string>;
  declare taskType: "DOCUMENT_UPLOAD" | "FORM" | "ACKNOWLEDGEMENT" | "REQUEST";
  declare status: CreationOptional<"PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED">;
  declare requiresDocument: CreationOptional<boolean>;
  declare requiresApproval: CreationOptional<boolean>;
  declare dueDate: CreationOptional<Date>;
  declare completedAt: CreationOptional<Date | null>;
  declare assignedBy: CreationOptional<ForeignKey<Users["id"]>>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<string>;
  declare updatedBy: CreationOptional<string>;
}

Tasks.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => crypto.randomUUID(),
      primaryKey: true,
      allowNull: false,
    },
    journeyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: OnboardingJourneys, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    taskType: {
      type: DataTypes.ENUM("DOCUMENT_UPLOAD", "FORM", "ACKNOWLEDGEMENT", "REQUEST"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    requiresDocument: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    requiresApproval: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    assignedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Users, key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
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
    tableName: "tasks",
    timestamps: true,
  },
);
