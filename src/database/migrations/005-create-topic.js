const shortid = require('shortid');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Topics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: shortid.generate(),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      languageId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Topics'),
};
