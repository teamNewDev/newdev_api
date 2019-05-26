module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('LanguageStacks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      stackId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      languageId: {
        allowNull: false,
        type: Sequelize.UUID
      },
    }),
  down: queryInterface => queryInterface.dropTable('LanguageStacks')
};
