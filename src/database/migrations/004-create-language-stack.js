module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('LanguageStacks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      stackId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      languageId: {
        allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('LanguageStacks'),
};
