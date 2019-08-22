export default (sequelize, DataTypes) => {
  const Subtopic = sequelize.define('Subtopic', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    topicId: {
      type: DataTypes.STRING,
    },
  });

  Subtopic.associate = models => {
    Subtopic.belongsTo(models.Topic, {
      foreignKey: 'topicId',
    });
    Subtopic.belongsTo(models.Resource, {
      foreignKey: 'topicId',
    });
  };

  return Subtopic;
};
