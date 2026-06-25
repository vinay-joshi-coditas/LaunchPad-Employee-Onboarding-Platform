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

export class OnboardingJourneys extends Model<
  InferAttributes<OnboardingJourneys>,
  InferCreationAttributes<OnboardingJourneys>
> {
  declare id: CreationOptional<string>;
  declare newHireId: ForeignKey<Users["id"]>;
  declare status: CreationOptional<string>;
  declare startDate: CreationOptional<Date>;
  declare completedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<string>;
  declare updatedBy: CreationOptional<string>;
}

OnboardingJourneys.init(
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
      references: { model: Users, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("Pending", "InProgress", "Completed"),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
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
    },
  },
  {
    sequelize,
    tableName: "onboarding_journey",
    timestamps: true,
  },
);

