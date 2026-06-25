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

    await queryInterface.createTable("documents", {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true,
        allowNull: false,
      },
      taskId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "tasks", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      uploadedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
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
        references: { model: "users", key: "id" },
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

    await queryInterface.dropTable('documents');
  },
};
