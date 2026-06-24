'use strict';
import  { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'users',
      {
        id: {
              type: DataTypes.UUID,
              defaultValue: Sequelize.fn('gen_random_uuid'),
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
              references: { model: "users", key: "id" },
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
              references: { model: "users", key: "id" },
            },
            updatedBy: {
              allowNull: true,
              type: DataTypes.UUID,
              references: { model: "users", key: "id" },
            }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
