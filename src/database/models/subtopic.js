import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Subtopic = sequelize.define(
    'Subtopic',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      topicId: {
        type: DataTypes.STRING
      }
    }
  );

  Subtopic.associate = (models) => {
    Subtopic.belongsTo(models.Topic, {
      foreignKey: 'subtopicId',
      as: 'subtopics'
    });
  };

  return Subtopic;
};
