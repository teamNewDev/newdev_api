module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Proficiencies', {
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
      topicId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      proficiency: {
        allowNull: false,
        type: Sequelize.FLOAT,
      }
    }),
  down: queryInterface => queryInterface.dropTable('Proficiencies')
};
