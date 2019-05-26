export default (sequelize, DataTypes) => {
  const Subtopic = sequelize.define(
    'Subtopic',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      topicId: {
        type: DataTypes.UUID
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
