module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Topics', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    languageId: {
      type: Sequelize.UUID
    },
  }),
  down: queryInterface => queryInterface.dropTable('Topics')
};
