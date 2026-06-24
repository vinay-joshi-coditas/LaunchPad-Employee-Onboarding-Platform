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
            name: "Vinay",
            email: "joshivinay085@gmail.com",
            password:
              "$2a$12$hPFtxACKSdrbo2NLp5sH4eLMACk4ZkayvL99luZH9B1TgaBhS2USq",
            role: "HR",
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
