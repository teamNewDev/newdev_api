module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ratings', {
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
    rating: {
      allowNull: false,
      type: Sequelize.FLOAT,
    }
  }),
  down: queryInterface => queryInterface.dropTable('Ratings')
};
