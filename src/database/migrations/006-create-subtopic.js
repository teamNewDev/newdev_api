module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Subtopics', {
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
    topicId: {
      type: Sequelize.UUID
    },
  }),
  down: queryInterface => queryInterface.dropTable('Subtopics')
};
