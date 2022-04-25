'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            email: 'daniilpadiryakov@gmail.com',
            password: await bcrypt.hash('12345', 7),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
