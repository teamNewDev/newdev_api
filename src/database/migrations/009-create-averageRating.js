module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('AverageRatings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      resourceId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      averageRating: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
  down: queryInterface => queryInterface.dropTable('AverageRatings'),
};
