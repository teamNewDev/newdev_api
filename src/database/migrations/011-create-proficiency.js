module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Proficiencies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      topicId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      proficiency: {
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
  down: queryInterface => queryInterface.dropTable('Proficiencies'),
};
