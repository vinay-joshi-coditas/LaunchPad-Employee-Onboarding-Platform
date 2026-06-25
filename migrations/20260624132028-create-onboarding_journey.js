"use strict";

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("onboarding_journey", {
       id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.fn("gen_random_uuid"),
            primaryKey: true,
            allowNull: false,
          },
          newHireId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "users", key: "id" },
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
            references: { model: "users", key: "id" },
          },
          updatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
            references: { model: "users", key: "id" },
          },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('onboarding_journey');
  },
};
