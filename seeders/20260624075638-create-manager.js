'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      try {
      await queryInterface.bulkInsert(
        "users",
        [
          {
            name: "Mohit",
            email: "mohit123@gmail.com",
            password:
              "$2a$12$/9u1URLwWhSk7.R2HqlQceG.RYUPfQotdM08j5eo1BiMPMpwSx7Iq",
            role: "Manager",
            isActive: true
          },
        ],
        {},
      );
    } catch (error) {
      console.log(error);
    }
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
