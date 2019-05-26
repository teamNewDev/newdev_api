module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Stacks', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }),
  down: queryInterface => queryInterface.dropTable('Stacks')
};
