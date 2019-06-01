module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Resources', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      topicId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      resourceType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      review: {
        allowNull: true,
        type: Sequelize.TEXT,
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
  down: queryInterface => queryInterface.dropTable('Resources'),
};
