"use strict";
import { DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("tasks", {
     id: {
           type: DataTypes.UUID,
           defaultValue: Sequelize.fn("gen_random_uuid"),
           primaryKey: true,
           allowNull: false,
         },
         journeyId: {
           type: DataTypes.UUID,
           allowNull: false,
           references: { model: "onboarding_journey", key: "id" },
           onDelete: "CASCADE",
           onUpdate: "CASCADE",
         },
         title: {
           type: DataTypes.STRING,
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
          defaultValue: false
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
           references: { model: "users", key: "id" },
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
           references: { model: "users", key: "id" },
         },
         updatedBy: {
           type: DataTypes.UUID,
           allowNull: true,
           references: { model: "users", key: "id" },
         }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("tasks");
  },
};
