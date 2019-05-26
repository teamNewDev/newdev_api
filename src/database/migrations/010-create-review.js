module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
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
    resourceId: {
      allowNull: false,
      type: Sequelize.UUID
    },
    review: {
      allowNull: false,
      type: Sequelize.TEXT,
    }
  }),
  down: queryInterface => queryInterface.dropTable('Reviews')
};
